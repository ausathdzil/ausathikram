import { baseUrl } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Page not found.',
  openGraph: {
    title: '404 Not Found | Ausath Ikram',
    description: 'Page not found.',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent('404 Not Found')}`,
        width: 1200,
        height: 630,
        alt: '404 Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className="grow flex flex-col justify-center items-center text-center space-y-4">
      <h1 className="text-xl lg:text-4xl">404 Not Found</h1>
    </div>
  );
}
