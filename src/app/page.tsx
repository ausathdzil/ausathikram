import Link from 'next/link';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { getBlogPostsMetadata } from '@/lib/blog';
import { sortByDateDesc } from '@/lib/utils';

const MAX_POSTS = 5;

export default function Home() {
  const posts = getBlogPostsMetadata();
  const recentPosts = sortByDateDesc(posts).slice(0, MAX_POSTS);

  return (
    <article className="prose prose-neutral dark:prose-invert">
      <h1 className="font-medium text-xl">Ausath Ikram</h1>
      <p>
        I&apos;m a Frontend Developer and I like to build websites. You can find
        my code on{' '}
        <a
          href="https://github.com/ausathdzil"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>{' '}
        and connect with me on{' '}
        <a
          href="https://linkedin.com/in/ausathdzil"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        .
      </p>
      <h2 className="font-medium text-xl">Blog</h2>
      <ItemGroup className="not-prose list-none">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <Item
              className="-ml-3"
              render={<Link href={`/blog/${post.slug}`} />}
              size="sm"
            >
              <ItemContent>
                <ItemTitle className="text-base">
                  {post.metadata.title}
                </ItemTitle>
                <ItemDescription>{post.metadata.summary}</ItemDescription>
              </ItemContent>
            </Item>
          </li>
        ))}
      </ItemGroup>
    </article>
  );
}
