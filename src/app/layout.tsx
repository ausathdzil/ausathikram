import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/theme-provider';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/skull.svg" />
        </head>
        <body
          className={clsx(
            'antialiased',
            geistSans.className,
            geistMono.variable
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
