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
        'w-full text-foreground sticky top-0 z-50 transition-all duration-20',
        {
          'bg-background/95 backdrop-blur-sm shadow-sm': isScrolled,
        }
      )}
    >
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
