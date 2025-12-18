import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { CommandButton } from '@/components/command-button';
import { MobileNav } from '@/components/mobile-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLinks } from '@/components/nav-links';
import { ThemeProvider } from '@/components/theme-provider';
import { getBlogPostsMetadata } from '@/lib/blog';
import { baseUrl, cn, sortByDateDesc } from '@/lib/utils';
import './globals.css';

const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

const commitMono = localFont({
  src: './fonts/CommitMono VariableFont.woff2',
  variable: '--font-commit-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ausath Ikram',
    template: '%s - Ausath Ikram',
  },
  description: 'Web developer.',
  openGraph: {
    url: baseUrl,
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
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
          commitMono.variable,
          'font-sans dark:antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-8 pt-safe-top">
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
        <ModeToggle />
      </div>
    </header>
  );
}
