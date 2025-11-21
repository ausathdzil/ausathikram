'use client';

import { ArrowUpRightIcon, NewspaperIcon, SearchIcon } from 'lucide-react';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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
import type { Metadata } from '@/lib/blog';
import { formatDate, navItems } from '@/lib/utils';

interface Post {
  metadata: Metadata;
  slug: string;
}

export function CommandButton({ posts }: { posts?: Post[] }) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <CommandMobile posts={posts} />
  ) : (
    <CommandDesktop posts={posts} />
  );
}

const macRegex = /Mac/;

function CommandDesktop({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isMac, setIsMac] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(macRegex.test(window.navigator.userAgent));
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback(
    (href: Route) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <Button
        aria-label="Search"
        onClick={() => setOpen(true)}
        size="sm"
        variant="secondary"
      >
        <kbd className="font-sans text-xs">{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
      </Button>
      <CommandDialog
        description="Search anything…"
        onOpenChange={setOpen}
        open={open}
        title="Search"
      >
        <CommandInput
          onValueChange={setValue}
          placeholder="Search…"
          value={value}
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
                  className="cursor-pointer"
                  key={post.slug}
                  onSelect={() => handleSelect(`/blog/${post.slug}` as Route)}
                >
                  <NewspaperIcon />
                  <div className="flex w-full items-center justify-between">
                    <p>{post.metadata.title}</p>
                    <time
                      className="ml-2 hidden text-muted-foreground text-sm sm:block"
                      dateTime={post.metadata.publishedAt}
                    >
                      {formatDate(post.metadata.publishedAt)}
                    </time>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            {navItems.map((nav) => (
              <CommandItem
                className="cursor-pointer"
                key={nav.href}
                onSelect={() => handleSelect(nav.href)}
              >
                <ArrowUpRightIcon />
                {nav.label}
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
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          aria-label="Search"
          onClick={() => setOpen(true)}
          size="icon-sm"
          variant="ghost"
        >
          <SearchIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Search</DrawerTitle>
          <DrawerDescription>Search anything…</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Command className="bg-background">
            <CommandInput
              onValueChange={setValue}
              placeholder="Search…"
              value={value}
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
                      className="mb-2 cursor-pointer"
                      key={post.slug}
                      onSelect={() => {
                        setOpen(false);
                        router.push(`/blog/${post.slug}`);
                      }}
                    >
                      <NewspaperIcon />
                      <div className="flex w-full items-center justify-between">
                        {post.metadata.title}
                        <span className="ml-2 hidden text-muted-foreground text-sm sm:block">
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
              <CommandGroup heading="Navigation">
                {navItems.map((nav) => (
                  <CommandItem
                    className="mb-2 cursor-pointer"
                    key={nav.href}
                    onSelect={() => {
                      setOpen(false);
                      router.push(nav.href);
                    }}
                  >
                    <ArrowUpRightIcon />
                    {nav.label}
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
