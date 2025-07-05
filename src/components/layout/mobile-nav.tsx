'use client';

import { ChevronLeftIcon, MenuIcon } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import type { Metadata } from '@/lib/blog';
import { projects } from '@/lib/projects';

interface Post {
  metadata: Metadata;
  slug: string;
  content: string;
}

export function MobileNav({ posts }: { posts?: Post[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const handleNavigation = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="flex grow items-center gap-4 sm:hidden">
      <Drawer onOpenChange={handleOpenChange} open={isOpen}>
        <DrawerTrigger asChild>
          <button aria-label="Menu" type="button">
            <MenuIcon size={16} />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Navigation menu</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <nav className="flex flex-col gap-4">
              <Link
                className={
                  pathname === '/' ? 'text-blue-800 dark:text-blue-400' : ''
                }
                href="/"
                onClick={handleNavigation}
              >
                About
              </Link>
            </nav>
            <div className="flex flex-col gap-4">
              <Link
                className={
                  pathname.startsWith('/blog')
                    ? 'text-blue-800 dark:text-blue-400'
                    : ''
                }
                href="/blog"
                onClick={handleNavigation}
              >
                Blog
              </Link>
              <nav className="flex flex-col gap-4 text-sm">
                {posts?.map((post) => (
                  <Link
                    className={
                      pathname.includes(post.slug)
                        ? 'text-blue-800 dark:text-blue-400'
                        : ''
                    }
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    onClick={handleNavigation}
                  >
                    {post.metadata.title}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                className={
                  pathname.startsWith('/projects')
                    ? 'text-blue-800 dark:text-blue-400'
                    : ''
                }
                href="/projects"
                onClick={handleNavigation}
              >
                Projects
              </Link>
              <nav className="flex flex-col gap-4 text-sm">
                {projects?.map((project) => (
                  <Link
                    className={
                      pathname.includes(project.slug)
                        ? 'text-blue-800 dark:text-blue-400'
                        : ''
                    }
                    href={`/projects/${project.slug}`}
                    key={project.slug}
                    onClick={handleNavigation}
                  >
                    {project.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
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
