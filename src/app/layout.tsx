import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RssIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { CommandButton } from '@/components/layout/command-button';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { buttonVariants } from '@/components/ui/button';
import { getBlogPostsMetadata } from '@/lib/blog';
import { baseUrl, cn, sortByDateDesc } from '@/lib/utils';
import './globals.css';

const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ausath Ikram',
    template: '%s - Ausath Ikram',
  },
  description: 'Web developer.',
  openGraph: {
    title: 'Ausath Ikram',
    description: 'Web developer.',
    url: baseUrl,
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
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          jetBrainsMono.variable,
          'font-sans dark:antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-8">
            <Header />
            <main className="flex w-full flex-1 flex-col pb-32">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function Header() {
  const posts = getBlogPostsMetadata();
  const sortedPosts = sortByDateDesc(posts);

  return (
    <header className="flex w-full items-center gap-2 py-8">
      <NavLinks />
      <MobileNav />
      <div className="flex items-center gap-2">
        <CommandButton posts={sortedPosts} />
        <a
          aria-label="RSS"
          className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
          href="/rss"
        >
          <RssIcon />
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
