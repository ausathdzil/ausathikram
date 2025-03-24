'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full">
      <nav className="flex justify-between items-center py-8">
        <Link className={pathname === '/' ? 'text-blue-400' : ''} href="/">
          About
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            className={pathname === '/projects' ? 'text-blue-400' : ''}
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className={pathname === '/blog' ? 'text-blue-400' : ''}
            href="/blog"
          >
            Blog
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
