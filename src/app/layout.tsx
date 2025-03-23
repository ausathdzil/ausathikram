import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { url } from '@/lib/utils';

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
  metadataBase: new URL('https://ausathikram.vercel.app'),
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
    images: [
      {
        url: `${url}/api/og?title=Ausath%20Ikram`,
        alt: 'Ausath Ikram',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
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
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased tracking-tight`}
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
