import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

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
    <div className="flex flex-1 flex-col justify-center items-center text-center space-y-4">
      <h1 className="text-xl lg:text-3xl">404 Not Found</h1>
      <Button asChild className="rounded-full">
        <Link href="/">
          <HomeIcon />
          Home
        </Link>
      </Button>
    </div>
  );
}
