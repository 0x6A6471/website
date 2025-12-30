import Image from "next/image";

import Time from "./time";

export default function HomePage() {
	return (
		<div className="space-y-16">
			<div className="flex flex-col items-center space-y-4">
				<Image
					className="flex items-center justify-center rounded-3xl bg-gray-950/50"
					src="images/0x6A6471.svg"
					alt="0x6A6471"
					width={100}
					height={100}
				/>
				<Time />
			</div>

			<section className="space-y-3">
				<p>Hey, I&apos;m jdq.</p>
				<p>Into computers, design & freedom-tech.</p>
				<p>
					Writing code at{" "}
					<a
						href="https://onrampbitcoin.com"
						className="text-orange-primary underline-offset-2 hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Onramp
					</a>
					.
				</p>
			</section>
		</div>
	);
}
