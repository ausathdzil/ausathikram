'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import { SkullIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="px-0 sm:px-6 lg:px-0 pt-8 pb-4 lg:pt-16 max-w-3xl mx-8 md:mx-auto">
        <nav className="flex justify-between items-center">
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/"
          >
            <SkullIcon aria-label="home icon" />
            <span
              className={clsx('hidden sm:block', {
                underline: pathname === '/',
              })}
            >
              home
            </span>
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="/projects"
              >
                <span className={clsx({ underline: pathname === '/projects' })}>
                  projects
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="/blogs"
              >
                <span className={clsx({ underline: pathname === '/blogs' })}>
                  blogs
                </span>
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <Separator />
    </>
  );
}
