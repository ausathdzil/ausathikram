import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Fira_Code, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: {
    default: 'Ausath Ikram',
    template: '%s | Ausath Ikram',
  },
  description: 'Web developer',
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
          className={`${inter.variable} ${firaCode.variable} font-sans antialiased tracking-tight`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col items-center min-h-screen max-w-2xl mx-auto px-8">
              <Header />
              <main className="w-full flex-1 flex flex-col items-center pb-8">
                {children}
              </main>
              <Toaster richColors />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
