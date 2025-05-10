'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex grow gap-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={
            (
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href)
            )
              ? 'text-blue-800 dark:text-blue-400'
              : ''
          }
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
