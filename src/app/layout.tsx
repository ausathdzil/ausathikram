import { ArrowUpRightIcon, RssIcon } from 'lucide-react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Zilla_Slab } from 'next/font/google';
import './globals.css';

import { CommandButton } from '@/components/layout/command-button';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { NavLinks } from '@/components/layout/nav-links';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { buttonVariants } from '@/components/ui/button';
import { getBlogPosts } from '@/lib/blog';
import { baseUrl, cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  variable: '--font-zilla-slab',
  weight: ['300', '400', '500', '600', '700'],
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          zillaSlab.variable,
          jetBrainsMono.variable,
          'font-sans dark:antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen max-w-3xl mx-auto px-8">
            <Header />
            <main className="w-full flex flex-1 flex-col pb-8 gap-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function Header() {
  const posts = getBlogPosts();

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <header className="w-full flex items-center gap-2 py-8">
      <NavLinks />
      <MobileNav posts={sortedPosts} />
      <div className="flex items-center gap-2">
        <CommandButton posts={sortedPosts} />
        <a
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          href="/rss"
        >
          <RssIcon />
          <span className="sr-only">RSS Feed</span>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t flex items-center gap-4 sm:gap-8 py-8 text-sm sm:text-base">
      <a
        className="flex items-center gap-1"
        href="https://github.com/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ArrowUpRightIcon size={16} />
        GitHub
      </a>
      <a
        className="flex items-center gap-1"
        href="https://linkedin.com/in/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ArrowUpRightIcon size={16} />
        LinkedIn
      </a>
      <a
        className="flex items-center gap-1"
        href="mailto:mail@ausathikram.com"
        rel="noopener noreferrer"
      >
        <ArrowUpRightIcon size={16} />
        Email
      </a>
    </footer>
  );
}
