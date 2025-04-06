'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Metadata } from '@/lib/blog';
import { projects } from '@/lib/projects';
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  FolderIcon,
  MenuIcon,
  NewspaperIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};

export default function Header({ posts }: { posts: Post[] }) {
  const pathname = usePathname();
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <header className="w-full flex items-center gap-4 py-8">
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
      <div className="sm:hidden grow flex items-center gap-4">
        <MobileNav pathname={pathname} />
        {pathname.startsWith('/blog/') && (
          <Button variant="ghost" size="icon">
            <Link href="/blog">
              <ChevronLeftIcon />
            </Link>
          </Button>
        )}
      </div>
      <CommandButton posts={sortedPosts} />
      <ModeToggle />
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
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
      </DrawerContent>
    </Drawer>
  );
}

function CommandButton({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const sortedPosts = posts?.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary" size="sm">
        <span className="sr-only">Search</span>
        <kbd className="font-sans text-xs">⌘ K</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={value}
          onValueChange={setValue}
          placeholder="Search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Posts">
            {sortedPosts
              ?.filter((post) =>
                post.metadata.title.toLowerCase().includes(value.toLowerCase())
              )
              .map((post) => (
                <CommandItem
                  key={post.slug}
                  className="cursor-pointer"
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/blog/${post.slug}`);
                  }}
                >
                  <NewspaperIcon />
                  <div className="flex w-full items-center justify-between">
                    {post.metadata.title}
                    <span className="hidden sm:block text-sm  ml-2 text-muted-foreground">
                      {new Date(post.metadata.publishedAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.map((project) => (
              <CommandItem
                key={project.slug}
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  router.push(`/projects/${project.slug}`);
                }}
              >
                <FolderIcon />
                {project.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            {navItems.map((nav) => (
              <CommandItem
                key={nav.href}
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  router.push(nav.href);
                }}
              >
                <ArrowUpRightIcon />
                {nav.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
