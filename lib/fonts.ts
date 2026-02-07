import { Geist_Mono, Libre_Franklin } from 'next/font/google'

export const libreFranklin = Libre_Franklin({
  variable: '--font-libre-franklin',
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
})
