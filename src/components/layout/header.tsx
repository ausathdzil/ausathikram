'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import clsx from 'clsx';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
