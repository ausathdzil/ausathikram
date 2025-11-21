import Link from 'next/link';

import { navItems } from '@/lib/utils';
import { Button } from '../ui/button';

export function NavLinks() {
  return (
    <nav className="-ml-3 hidden flex-1 gap-2 sm:flex">
      {navItems.map((item) => (
        <Button asChild key={item.label} size="sm" variant="ghost">
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
