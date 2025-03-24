'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center gap-8 py-8">
      <nav className="w-full flex gap-8">
        <Link className={pathname === '/' ? 'text-blue-400' : ''} href="/">
          About
        </Link>
        <div className="flex grow items-center justify-end gap-4 sm:gap-8">
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
        </div>
      </nav>
      <ModeToggle />
    </header>
  );
}
