'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center gap-4 py-8">
      <nav className="hidden sm:flex grow gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
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
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="sm:hidden grow">
        <MobileNav />
      </div>
      <ModeToggle />
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleNavigation = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Drawer open={isOpen} activeSnapPoint={0.5} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <MenuIcon size={16} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <nav className="p-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={handleNavigation}>
              {item.name}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
