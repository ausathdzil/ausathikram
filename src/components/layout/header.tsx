'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import { SkullIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="pt-8 lg:pt-16 pb-4 px-8 xl:px-80">
        <nav className="flex justify-between items-center">
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/"
          >
            <SkullIcon />
            <span className={clsx({ underline: pathname === '/' })}>home</span>
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
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <Separator />
    </>
  );
}
