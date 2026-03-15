import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "oku.ams3.cdn.digitaloceanspaces.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/.well-known/nostr.json",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Content-Type", value: "application/json; charset=utf-8" },
				],
			},
		];
	},
};

export default nextConfig;
