'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center gap-4 py-8">
      <nav className="w-full flex gap-8">
        <Link
          className={pathname === '/' ? 'text-blue-800 dark:text-blue-400' : ''}
          href="/"
        >
          About
        </Link>
        <Link
          className={
            pathname.startsWith('/projects')
              ? 'text-blue-800 dark:text-blue-400'
              : ''
          }
          href="/projects"
        >
          Projects
        </Link>
        <Link
          className={
            pathname.startsWith('/blog')
              ? 'text-blue-800 dark:text-blue-400'
              : ''
          }
          href="/blog"
        >
          Blog
        </Link>
      </nav>
      <ModeToggle />
    </header>
  );
}
