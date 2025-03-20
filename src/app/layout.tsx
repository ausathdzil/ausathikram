import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Fira_Code, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Ausath Ikram',
    template: '%s | Ausath Ikram',
  },
  description: 'Web Developer',
  openGraph: {
    title: 'Ausath Ikram',
    description: 'Web Developer',
    url: 'https://ausathikram.vercel.app',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
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
            <main className="w-full grow flex flex-col items-center pb-8">
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
