"use client";

import { useEffect, useState } from "react";

import Icon from "@/components/ui/icon";

export default function Time() {
	const [time, setTime] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTime(now.toISOString().slice(11, 19));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<time
			dateTime={time}
			className="flex flex-col items-center gap-y-2 font-mono text-gray-500"
		>
			<span className="text-xs">{time} UTC</span>
			<a
				href="https://bitcoin.org/bitcoin.pdf"
				className="group relative flex animate-spin-slow items-center hover:[animation-play-state:paused]"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon
					name="btc"
					size="20"
					className="relative z-10 text-orange-primary"
				/>
				<span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-8 rounded-full bg-orange-mute opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" />
			</a>
		</time>
	);
}
