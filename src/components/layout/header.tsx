'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import Link from 'next/link';
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
      className={clsx('sticky top-0 z-50 transition-all duration-200', {
        'bg-background/80 backdrop-blur-sm shadow-sm': isScrolled,
      })}
    >
      <div className="px-0 sm:px-6 lg:px-0 py-6 max-w-3xl mx-8 md:mx-auto">
        <nav className="flex justify-between items-center">
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/"
          >
            <span className={pathname === '/' ? 'underline' : ''}>home</span>
          </Link>
          <ul className="flex items-center gap-4 sm:gap-8">
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="/projects"
              >
                <span className={pathname === '/projects' ? 'underline' : ''}>
                  projects
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="/blog"
              >
                <span className={pathname === '/blog' ? 'underline' : ''}>
                  blog
                </span>
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
