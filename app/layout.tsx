import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'
import { fontSans } from "@/lib/fonts"
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar } from '@/components/Avatar'
import { SignIn } from '@/components/signin'
import { getUserSession } from '@/lib/auth'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BlackJack game online free',
	description: 'Play Blackjack online free',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getUserSession()
	return (
		<html lang="en">
			<body
				className={cn(
					"h-screen relative   font-sans antialiased",
					fontSans.variable
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main suppressHydrationWarning className="relative flex flex-col justify-center    h-screen ">
						<div id="bg_svg" className="absolute  inset-0 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 h-screen w-screen"></div>


						<nav className="flex p-4 space-x-2 justify-end items-center w-80vw ">
							<ThemeToggle />
							{user ? <Avatar user={user} /> : <SignIn />}
						</nav>
						<section id='children' className="relative flex-1 ">
							{children}
						</section>
					</main>

				</ThemeProvider>
			</body>
		</html>
	)
}
