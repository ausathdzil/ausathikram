'use client';

import { ChevronLeftIcon, MenuIcon, XIcon } from 'lucide-react';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex grow items-center gap-4 sm:hidden">
      <NavPopover pathname={pathname} />
      {pathname.startsWith('/blog/') && (
        <Button asChild size="sm" variant="ghost">
          <Link href="/blog">
            <ChevronLeftIcon />
          </Link>
        </Button>
      )}
    </div>
  );
}

interface NavItem<T extends string = string> {
  href: T;
  label: string;
}

const navItems: NavItem<Route>[] = [
  { label: 'About', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

function NavPopover({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    document.body.style.overflow = open ? 'hidden' : 'unset';
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <button className="[&_svg]:size-4" type="button">
          <span className="sr-only">Menu</span>
          <MenuIcon className={isOpen ? 'hidden' : 'block'} />
          <XIcon className={isOpen ? 'block' : 'hidden'} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-16}
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-0"
        side="bottom"
        sideOffset={14}
      >
        <nav className="overflow-auto border-t p-8">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    'font-medium text-xl',
                    (
                      item.href === '/'
                        ? pathname === item.href
                        : pathname.startsWith(item.href)
                    )
                      ? 'text-blue-800 dark:text-blue-400'
                      : ''
                  )}
                  href={item.href}
                  onClick={() => {
                    handleOpenChange(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
