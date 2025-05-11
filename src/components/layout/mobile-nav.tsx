'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Metadata } from '@/lib/blog';
import { ChevronLeftIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
];

export default function MobileNav({ posts }: { posts?: Post[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleNavigation = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="sm:hidden grow flex items-center gap-4">
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <button>
            <MenuIcon size={16} />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
          </DrawerHeader>
          <nav className="p-4 flex flex-col gap-4">
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
                onClick={handleNavigation}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-2">
            <h2 className="text-foreground font-semibold">Blog</h2>
          </div>
          <nav className="p-4 flex flex-col gap-4">
            {posts?.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={
                  pathname.includes(post.slug)
                    ? 'text-blue-800 dark:text-blue-400'
                    : ''
                }
                onClick={handleNavigation}
              >
                {post.metadata.title}
              </Link>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
      {pathname.startsWith('/blog/') && (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">
            <ChevronLeftIcon />
          </Link>
        </Button>
      )}
    </div>
  );
}
