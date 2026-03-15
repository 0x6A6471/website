"use client";

import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

import cn from "@/utils/cn";

const variants = {
	open: {
		opacity: 1,
		transition: { ease: "easeOut", duration: 1.1 },
	},
	closed: {
		opacity: 1,
		transition: { ease: "easeIn", duration: 1.2 },
	},
};

const textVariants = {
	initial: { opacity: 0, y: 10 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

export default function ContactDropdown() {
	const [copied, setCopied] = useState(false);
	const [open, setOpen] = useState(false);
	const controls = useAnimationControls();

	useEffect(() => {
		if (open) {
			controls.start("open");
		}
	}, [controls, open]);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText("0x6a6471@proton.me");
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (err) {
			console.error("Failed to copy email:", err);
		}
	}

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger asChild>
				<button className="rounded-[14px] bg-gray-700/80 px-4 py-[7.8px] font-medium text-gray-100 hover:text-gray-50 focus:outline-hidden">
					<AnimatePresence mode="wait">
						<motion.span
							key={copied ? "copied" : "contact"}
							variants={textVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							{copied ? (
								<span className="inline-flex items-center gap-2 text-[#46A758]">
									Copied!
									<Icon
										name="check-circle"
										variant="gesalt"
										className={cn(
											open ? "rotate-180" : "",
											"transition duration-150 ease-in-out",
										)}
									/>
								</span>
							) : (
								<span className="inline-flex items-center gap-2">
									Contact
									<Icon
										name="chevron-down"
										className={cn(
											open ? "rotate-180" : "",
											"transition duration-150 ease-in-out",
										)}
									/>
								</span>
							)}
						</motion.span>
					</AnimatePresence>
				</button>
			</DropdownMenu.Trigger>

			<AnimatePresence>
				{open ? (
					<DropdownMenu.Portal forceMount>
						<DropdownMenu.Content
							align="end"
							alignOffset={-6}
							className="relative mb-3 rounded-[20px] bg-gray-800/80 p-1.5 text-gray-200 shadow-sm backdrop-blur-xs"
						>
							<motion.div
								key={open ? "open" : "closed"}
								initial="closed"
								animate={controls}
								exit="closed"
								variants={variants}
							>
								<DropdownMenu.Item
									className="flex cursor-default items-center gap-4 rounded-[14px] px-4 py-2.5 text-sm outline-hidden focus:bg-gray-800 focus:text-orange-primary"
									onClick={copyToClipboard}
								>
									<Icon name="email" variant="filled" />
									Email
								</DropdownMenu.Item>

								<a
									href="https://github.com/0x6a6471"
									target="_blank"
									rel="noopener noreferrer"
								>
									<DropdownMenu.Item className="flex items-center gap-4 rounded-[14px] px-4 py-2.5 text-sm outline-hidden focus:bg-gray-800 focus:text-[#6cc644]">
										<Icon name="github" variant="filled" />
										Github
									</DropdownMenu.Item>
								</a>

								<a
									href="https://yakihonne.com/profile/0x6a6471@0x6a6471.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<DropdownMenu.Item className="flex items-center gap-4 rounded-[14px] px-4 py-2.5 text-sm outline-hidden focus:bg-gray-800 focus:text-[#6E56CF]">
										<Icon name="nostr" variant="filled" />
										Nostr
									</DropdownMenu.Item>
								</a>

								<a
									href="https://x.com/0x6a6471"
									target="_blank"
									rel="noopener noreferrer"
								>
									<DropdownMenu.Item className="flex items-center gap-4 rounded-[14px] px-4 py-2.5 text-sm outline-hidden focus:bg-gray-800 focus:text-[#1DA1F2]">
										<Icon name="twitter" variant="filled" />
										Twitter
									</DropdownMenu.Item>
								</a>
							</motion.div>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				) : null}
			</AnimatePresence>
		</DropdownMenu.Root>
	);
}
