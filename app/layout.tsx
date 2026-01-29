import type { Metadata } from 'next'
import { Cascadia_Code, Libre_Franklin } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'

const libreFranklin = Libre_Franklin({
  variable: '--font-libre-franklin',
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const jetBrainsMono = Cascadia_Code({
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ausath Ikram',
  description: 'Web developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          libreFranklin.variable,
          jetBrainsMono.variable,
          'font-sans dark:antialiased'
        )}
      >
        <main className="prose prose-neutral dark:prose-invert mx-auto py-16 prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-a:text-blue-700 prose-h1:text-2xl">
          {children}
        </main>
      </body>
    </html>
  )
}
