const FEED_TIMEOUT_MS = 15_000;

const feedHeaders = {
	accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1",
	"user-agent": "Mozilla/5.0 (compatible; 0x6a6471.com; +https://0x6a6471.com)",
};

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

	const r = await fetch(url, {
		headers: feedHeaders,
		signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
	});

	if (!r.ok) {
		const body = await r.text();

		throw new Error(
			`parseRssFeed: ${url} responded with ${r.status} ${r.statusText}. Body: ${body.slice(0, 300)}`,
		);
	}

	const xmlText = await r.text();

	if (!/<rss[\s>]/i.test(xmlText)) {
		throw new Error(
			`parseRssFeed: ${url} did not return an RSS feed (content-type: ${r.headers.get("content-type") ?? "unknown"}). Body: ${xmlText.slice(0, 300)}`,
		);
	}

	const itemRegex = /<item>([\s\S]*?)<\/item>/g;
	const items = [];
	let match;

	while ((match = itemRegex.exec(xmlText)) !== null) {
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
