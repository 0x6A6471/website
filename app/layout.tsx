import type { Metadata } from "next";

import { Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Nav from "./nav";
import "./globals.css";

export const metadata: Metadata = {
	title: "~/",
	description:
		"Software and design. Passionate about digital privacy, human-centric technology, and empowering user freedoms.",
	openGraph: {
		title: "~/",
		description:
			"Software and design. Passionate about digital privacy, human-centric technology, and empowering user freedoms.",
		url: "https://0x6a6471.com",
		siteName: "0x6A6471",
		locale: "en-US",
		type: "website",
	},
	icons: {
		shortcut: "/favicon.ico",
	},
};

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistMono.variable}>
			<head>
				<link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
			</head>
			<body className="bg-gray-1000 text-gray-50">
				<Nav />

				<main className="mx-auto mt-16 max-w-lg px-4 pb-28 sm:px-0">
					{children}
				</main>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
