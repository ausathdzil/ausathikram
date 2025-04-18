import Footer from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { getBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { unstable_ViewTransition as ViewTransition } from 'react';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
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
    template: '%s - Ausath Ikram',
  },
  description: 'Web Developer',
  openGraph: {
    title: 'Ausath Ikram',
    description: 'Web Developer',
    url: 'https://ausathikram.com',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
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
  const posts = getBlogPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${robotoMono.variable} antialiased`}
        style={{ fontFeatureSettings: "'ss01', 'ss02', 'ss08', 'cv11'" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen max-w-2xl mx-auto px-8">
            <Header posts={posts} />
            <ViewTransition name="crossfade">
              <main className="w-full grow flex flex-col pb-16 gap-8">
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
