import type { Metadata } from 'next';
import Image from 'next/image';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import notFound from '../../public/404-NotFound.png';

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
    <main className="grid flex-1 place-items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image
              alt="404 Not Found"
              height={216}
              loading="eager"
              src={notFound}
              width={384}
            />
          </EmptyMedia>
          <EmptyTitle>Page Not Found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for does not exists
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
}
