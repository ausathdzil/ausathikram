'use client';

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
      <Link
        className={pathname === '/email' ? 'text-blue-400' : ''}
        href="/email"
      >
        Email
      </Link>
    </footer>
  );
}
