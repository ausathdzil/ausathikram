'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import clsx from 'clsx';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'text-foreground sticky top-0 z-50 transition-all duration-200 border-b border-zinc-800',
        {
          'bg-background/80 backdrop-blur-sm shadow-sm': isScrolled,
        }
      )}
    >
      <nav className="flex justify-between items-center px-6 lg:px-0 py-6 max-w-3xl mx-auto">
        <Link
          className="flex gap-2 hover:underline underline-offset-4"
          href="/"
        >
          <span className={pathname === '/' ? 'underline' : ''}>home</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/projects"
          >
            <span className={pathname === '/projects' ? 'underline' : ''}>
              projects
            </span>
          </Link>
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/blog"
          >
            <span className={pathname === '/blog' ? 'underline' : ''}>
              blog
            </span>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
