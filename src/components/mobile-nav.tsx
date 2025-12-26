'use client';

import { ChevronLeftIcon, MenuIcon, XIcon } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn, navItems } from '@/lib/utils';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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
        <PopoverTrigger aria-label="Menu">
          {isOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={-16}
          className="h-(--available-height) w-(--available-width) bg-background/90 p-0 ring-0 backdrop-blur"
          side="bottom"
          sideOffset={14}
        >
          <nav className="px-7 py-6">
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
        <Button
          nativeButton={false}
          render={<Link href="/blog" />}
          size="sm"
          variant="ghost"
        >
          <ChevronLeftIcon />
        </Button>
      )}
    </div>
  );
}
