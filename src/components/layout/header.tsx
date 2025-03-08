'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full text-foreground">
      <nav className="flex justify-between items-center py-8">
        <Link className={pathname === '/' ? 'underline' : ''} href="/">
          Home
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            className={pathname === '/projects' ? 'underline' : ''}
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className={pathname === '/blog' ? 'underline' : ''}
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
