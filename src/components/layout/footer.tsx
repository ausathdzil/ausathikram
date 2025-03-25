'use client';

import { baseUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="w-full border-t flex justify-start items-center gap-8 text-right py-8">
      <a
        href="https://github.com/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a href={`${baseUrl}/api/rss`} target="_blank">
        RSS
      </a>
      <Link
        className={
          pathname === '/email' ? 'text-blue-800 dark:text-blue-400' : ''
        }
        href="/email"
      >
        Email
      </Link>
    </footer>
  );
}
