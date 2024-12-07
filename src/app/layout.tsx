import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
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
          className={`${inter.variable} ${jetBrainsMono.variable} antialiased tracking-tight`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col items-center min-h-screen max-w-2xl mx-auto px-2">
              <Header />
              <main className="w-full flex-1 flex flex-col items-center py-4">
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
