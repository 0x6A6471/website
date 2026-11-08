const FEED_TIMEOUT_MS = 15_000;

const FEED_PROXY = (process.env.OKU_RSS_PROXY ?? "https://r.jina.ai").replace(
	/\/$/,
	"",
);

const feedHeaders = {
	accept:
		"application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1",
	"user-agent": "Mozilla/5.0 (compatible; 0x6a6471.com; +https://0x6a6471.com)",
};

type FeedResponse = {
	ok: boolean;
	status: number;
	statusText: string;
	contentType: string | null;
	body: string;
};

function failedRequest(error: unknown): FeedResponse {
	return {
		ok: false,
		status: 0,
		statusText: error instanceof Error ? error.message : "request failed",
		contentType: null,
		body: "",
	};
}

async function request(
	url: string,
	headers: Record<string, string>,
): Promise<FeedResponse> {
	const response = await fetch(url, {
		headers,
		signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
	});

	return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		contentType: response.headers.get("content-type"),
		body: await response.text(),
	};
}

function isRss(body: string) {
	return /<rss[\s>]/i.test(body);
}

async function fetchFeedXml(url: string) {
	const direct = await request(url, feedHeaders).catch(failedRequest);

	if (direct.ok && isRss(direct.body)) {
		return direct.body;
	}

	console.warn(
		`parseRssFeed: ${url} failed directly (${direct.status} ${direct.statusText}); retrying via ${FEED_PROXY}.`,
	);

	const proxied = await request(`${FEED_PROXY}/${url}`, {
		...feedHeaders,
		"x-return-format": "html",
	}).catch(failedRequest);

	if (proxied.ok && isRss(proxied.body)) {
		return proxied.body;
	}

	throw new Error(
		`parseRssFeed: ${url} failed directly (${direct.status} ${direct.statusText}: ${direct.body.slice(0, 200)}) and via ${FEED_PROXY} (${proxied.status} ${proxied.statusText}: ${proxied.body.slice(0, 200)}).`,
	);
}

function getTagContent(tag: string, content: string) {
	const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, "s");
	const match = content.match(regex);

	return match
		? match[1]
				.trim()
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&amp;/g, "&")
		: "";
}

export default async function parseRssFeed(url: string | undefined) {
	if (!url) {
		throw new Error(
			"parseRssFeed: feed URL is missing. Set the OKU_* environment variables.",
		);
	}

	const xmlText = await fetchFeedXml(url);

	const itemRegex = /<item>([\s\S]*?)<\/item>/g;
	const items = [];

	for (const match of xmlText.matchAll(itemRegex)) {
		const content = match[1];

		items.push({
			guid: getTagContent("guid", content),
			title: getTagContent("title", content),
			link: getTagContent("link", content),
			description: getTagContent("description", content),
			creator: getTagContent("dc:creator", content),
			pubDate: getTagContent("pubDate", content),
			cover:
				getTagContent("oku:cover", content) ||
				getTagContent("enclosure", content),
		});
	}

	return items;
}
