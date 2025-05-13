import CommandButton from '@/components/layout/command-button';
import MobileNav from '@/components/layout/mobile-nav';
import ModeToggle from '@/components/layout/mode-toggle';
import NavLinks from '@/components/layout/nav-links';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { getBlogPosts } from '@/lib/blog';
import { baseUrl, cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Roboto_Mono, Zilla_Slab } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-inter',
});

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  variable: '--font-zilla-slab',
  weight: ['400', '500', '600', '700'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ausath Ikram',
    template: '%s - Ausath Ikram',
  },
  description: 'Web developer',
  openGraph: {
    title: 'Ausath Ikram',
    description: 'Web developer',
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
          robotoMono.variable,
          'font-sans tracking-tight dark:antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center min-h-screen max-w-2xl mx-auto px-8">
            <Header />
            <main className="w-full flex flex-1 flex-col pb-8 gap-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
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
    <header className="w-full flex items-center gap-4 py-8">
      <NavLinks />
      <MobileNav posts={sortedPosts} />
      <CommandButton posts={sortedPosts} />
      <ModeToggle />
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t flex items-center gap-4 sm:gap-8 py-8">
      <a
        href="https://github.com/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a href="mailto:mail@ausathikram.com">Email</a>
    </footer>
  );
}
