'use client';

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
import { projects } from '@/lib/projects';
import { ArrowUpRightIcon, FolderIcon, NewspaperIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Post = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string[];
  };
  slug: string;
};

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

export default function CommandButton() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState<Post[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/blog');
      const data: Post[] = await res.json();
      setPosts(data);
    };
    fetchPosts();

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
        <kbd className="font-mono text-xs">⌘ K</kbd>
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
