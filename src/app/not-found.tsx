import { HomeIcon } from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Page not found.',
  openGraph: {
    title: '404 Not Found - Ausath Ikram',
    description: 'Page not found.',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-xl lg:text-3xl">404 Not Found</h1>
      <Link className={buttonVariants({ size: 'lg' })} href="/">
        <HomeIcon />
        Home
      </Link>
    </div>
  );
}
