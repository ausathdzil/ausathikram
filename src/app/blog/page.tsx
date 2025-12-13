import { getYear } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { getBlogPostsMetadata } from '@/lib/blog';
import { baseUrl, formatDate, sortByDateDesc } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: "Ausath Ikram's blog.",
  openGraph: {
    url: `${baseUrl}/blog`,
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  const allPosts = getBlogPostsMetadata();
  const sortedPosts = sortByDateDesc(allPosts);

  const groupedPosts = sortedPosts.reduce(
    (acc, post) => {
      const year = getYear(post.metadata.publishedAt);
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allPosts>
  );

  return (
    <article className="prose prose-neutral dark:prose-invert">
      <h1 className="font-medium text-xl">Blog</h1>
      <p>Things that interest me, mostly about web development.</p>
      <div className="space-y-4">
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, posts]) => (
            <div className="space-y-2" key={year}>
              <h2 className="font-medium text-xl">{year}</h2>
              <ItemGroup className="not-prose mt-2 list-none space-y-1">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Item
                      className="-ml-3"
                      render={<Link href={`/blog/${post.slug}`} />}
                      size="sm"
                    >
                      <ItemContent>
                        <ItemTitle>{post.metadata.title}</ItemTitle>
                        <ItemDescription>
                          {post.metadata.summary}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions className="hidden self-start tabular-nums sm:block">
                        <time dateTime={post.metadata.publishedAt}>
                          {formatDate(post.metadata.publishedAt, false)}
                        </time>
                      </ItemActions>
                    </Item>
                  </li>
                ))}
              </ItemGroup>
            </div>
          ))}
      </div>
    </article>
  );
}
