'use client';

import { ChevronLeftIcon, MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, navItems } from '@/lib/utils';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    document.body.style.overflow = open ? 'hidden' : 'unset';
  };

  return (
    <div className="flex flex-1 items-center gap-4 sm:hidden">
      <Popover onOpenChange={handleOpenChange} open={isOpen}>
        <PopoverTrigger asChild>
          <button
            aria-label="Menu"
            className="[&_svg]:size-4"
            title="Menu"
            type="button"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={-16}
          className="h-(--radix-popper-available-height) w-(--radix-popper-available-width) border-none bg-background/90 p-0 backdrop-blur"
          side="bottom"
          sideOffset={14}
        >
          <nav className="px-8 py-6">
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
                    onClick={() => handleOpenChange(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
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
