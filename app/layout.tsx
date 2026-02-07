import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import { geistMono, libreFranklin } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ausathikram.com'),
  title: {
    default: 'Ausath Ikram',
    template: '%s - Ausath Ikram',
  },
  description: 'Web developer.',
  openGraph: {
    url: 'https://ausathikram.com',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreFranklin.variable} ${geistMono.variable} font-sans`}
      >
        <main className="prose prose-neutral mx-auto w-full prose-pre:bg-neutral-50 p-8 prose-blockquote:font-serif prose-code:font-mono prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-pre:font-mono prose-a:text-blue-700 prose-blockquote:text-lg prose-h1:text-2xl prose-blockquote:not-italic md:px-0 md:py-16 prose-blockquote:[&>p:first-of-type::before]:content-[''] prose-blockquote:[&>p:last-of-type::after]:content-['']">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
