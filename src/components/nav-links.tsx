'use client';

import Link from 'next/link';

import { navItems } from '@/lib/utils';
import { Button } from './ui/button';

export function NavLinks() {
  return (
    <nav className="-ml-3 hidden flex-1 gap-2 sm:flex">
      {navItems.map((item) => (
        <Button
          key={item.label}
          nativeButton={false}
          render={
            <Link
              href={item.href}
              target={item.href === '/rss' ? '_blank' : '_self'}
            />
          }
          size="sm"
          variant="ghost"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
