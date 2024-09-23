import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/theme-provider';
import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ausath ikram',
    template: '%s | ausath ikram',
  },
  description: 'web developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <head>
          <link
            rel="icon"
            href="/skull.svg"
          />
        </head>
        <body
          className={clsx(
            'antialiased',
            GeistSans.className,
            GeistMono.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex flex-col items-center min-h-[calc(100vh-178px)] text-muted-foreground mx-8 lg:mx-auto">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
