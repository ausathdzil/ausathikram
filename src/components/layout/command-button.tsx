'use client';

import {
  ArrowUpRightIcon,
  FolderIcon,
  NewspaperIcon,
  SearchIcon,
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
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
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Metadata } from '@/lib/blog';
import { projects } from '@/lib/projects';

interface Post {
  metadata: Metadata;
  slug: string;
  content: string;
}

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

export function CommandButton({ posts }: { posts?: Post[] }) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CommandMobile posts={posts} />
  ) : (
    <CommandDesktop posts={posts} />
  );
}

function CommandDesktop({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isMac, setIsMac] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/Mac/.test(window.navigator.userAgent));
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary" size="sm">
        <span className="sr-only">Search</span>
        <kbd className="font-sans text-xs">{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
      </Button>
      <CommandDialog
        title="Search"
        description="Search anything on my website"
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          value={value}
          onValueChange={setValue}
          placeholder="Search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Posts">
            {posts
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

function CommandMobile({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const router = useRouter();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
          <span className="sr-only">Search</span>
          <SearchIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-popover">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Search</DrawerTitle>
          <DrawerDescription>Search anything on my website</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Command>
            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder="Search..."
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Posts">
                {posts
                  ?.filter((post) =>
                    post.metadata.title
                      .toLowerCase()
                      .includes(value.toLowerCase())
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
                          {new Date(
                            post.metadata.publishedAt
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
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
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
