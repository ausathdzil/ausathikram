'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem<T extends string = string> {
  href: T;
  label: string;
}

const navItems: NavItem<Route>[] = [
  { label: 'About', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

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
