import './globals.css'
import SupabaseProvider from './supabase-provider';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/utils/utils'
import { fontSans } from "@/lib/fonts"
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar } from '@/components/Avatar'
import Logo from '@/components/icons/Logo';
import { createServerSupabaseClient } from './supabase-server';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3001'

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'BlackJack game online free',
	description: 'Play Blackjack online free',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const supabase = createServerSupabaseClient()
	const { data: { user } } = await supabase.auth.getUser()

	return (
		<html lang="en" >
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
					<SupabaseProvider>
						<main suppressHydrationWarning className="relative flex flex-col justify-center dark:bg-circle   bg-velvet_bg  h-screen ">
							<nav className="flex p-4 space-x-2 justify-center items-center w-80vw ">
								<Link href='/'>
									<Logo />

								</Link>
								<ThemeToggle />
								{user ? <Avatar user={user} /> : <Link className={buttonVariants({ variant: "default" })} href='/signin'>Sign in</Link>}
							</nav>
							<section id='children' className="relative flex-1 ">
								{children}
							</section>
						</main>
					</SupabaseProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
