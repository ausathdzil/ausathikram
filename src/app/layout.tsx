import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { baseUrl } from '@/lib/utils';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { unstable_ViewTransition as ViewTransition } from 'react';
import './globals.css';

const inter = localFont({
  src: '../../public/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ausathikram.com'),
  title: {
    default: 'Ausath Ikram',
    template: '%s | Ausath Ikram',
  },
  description: 'Web Developer',
  openGraph: {
    title: 'Ausath Ikram',
    description: 'Web Developer',
    url: 'https://ausathikram.com',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent('Ausath Ikram')}`,
        alt: 'Ausath Ikram',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable}`}
        style={{ fontFeatureSettings: "'ss01', 'cv11'" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen max-w-2xl mx-auto px-8">
            <Header />
            <ViewTransition name="crossfade">
              <main className="w-full grow flex flex-col pb-8 gap-8">
                {children}
              </main>
            </ViewTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
