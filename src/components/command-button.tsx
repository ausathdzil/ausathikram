'use client';

import { ArrowUpRightIcon, NewspaperIcon, SearchIcon } from 'lucide-react';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMac } from '@/hooks/use-mac';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Metadata } from '@/lib/blog';
import { navItems } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Kbd } from './ui/kbd';

interface Post {
  metadata: Metadata;
  slug: string;
}

export function CommandButton({ posts }: { posts?: Post[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const isMobile = useIsMobile();
  const isMac = useMac();

  useEffect(() => {
    if (!isMobile && typeof window !== 'undefined') {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((prevOpen) => !prevOpen);
        }
      };

      document.addEventListener('keydown', down);

      return () => {
        document.removeEventListener('keydown', down);
      };
    }
  }, [isMobile]);

  const handleSelect = (href: Route) => {
    setOpen(false);
    router.push(href);
  };

  const command = (
    <Command>
      <CommandInput
        onValueChange={setValue}
        placeholder="Search…"
        value={value}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Posts">
          {posts?.map((post) => (
            <CommandItem
              className={isMobile ? 'mb-2 cursor-pointer' : 'cursor-pointer'}
              key={post.slug}
              onSelect={() => handleSelect(`/blog/${post.slug}` as Route)}
            >
              <NewspaperIcon />
              <p className="line-clamp-1">{post.metadata.title}</p>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          {navItems.map((nav) => (
            <CommandItem
              className={isMobile ? 'mb-2 cursor-pointer' : 'cursor-pointer'}
              key={nav.href}
              onSelect={() => handleSelect(nav.href)}
            >
              <ArrowUpRightIcon />
              <p className="line-clamp-1">{nav.label}</p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isMobile) {
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
        <DrawerContent className="bg-popover">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Search</DrawerTitle>
            <DrawerDescription>Search this website…</DrawerDescription>
          </DrawerHeader>
          <div className="p-2">{command}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" variant="outline">
        Search…
        <Kbd>{isMac ? '⌘' : 'Ctrl'}&nbsp;+&nbsp;K</Kbd>
      </Button>
      <CommandDialog
        description="Search this website…"
        onOpenChange={setOpen}
        open={open}
        title="Search"
      >
        {command}
      </CommandDialog>
    </>
  );
}
