'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/utils';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-1 gap-8 sm:flex">
      {navItems.map((item) => (
        <Link
          className={
            (
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href)
            )
              ? 'text-blue-800 dark:text-blue-400'
              : ''
          }
          href={item.href}
          key={item.label}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
