import { url } from '@/lib/utils';
import { FrownIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Page not found.',
  openGraph: {
    title: '404 Not Found | Ausath Ikram',
    description: 'Page not found.',
    url: 'https://ausathikram.vercel.app/404',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    images: [
      {
        url: `${url}/api/og?title=404%20Not%20Found`,
        width: 1200,
        height: 630,
        alt: '404 Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center text-primary space-y-4">
      <FrownIcon size={64} />
      <h1 className="text-xl lg:text-4xl">404 Not Found</h1>
    </div>
  );
}
