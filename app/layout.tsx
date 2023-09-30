import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'
import { fontSans } from "@/lib/fonts"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlackJack game online free',
  description: 'Play Blackjack online free',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <main className="relative flex flex-col justify-center h-full ">

            <div id="bg_svg" className="absolute inset-0 bg-cards_bg opacity-[0.2] dark:opacity-[0.1]"></div>
            <div
              id="gradient"
              className="absolute inset-0 object-cover bg-gradient-to-b dark:bg-gradient-to-b dark:from-background dark:to-current from-background to-green-300 opacity-70 dark:opacity-30"
            ></div>
            <section id='children' className="relative flex-1 ">
              {children}

            </section>
          </main>

        </ThemeProvider>
      </body>
    </html>
  )
}
