import CustomMDX from '@/components/blog/custom-mdx';
import { formatDate, getBlogPosts, getTableOfContents } from '@/lib/blog';
import { baseUrl } from '@/lib/utils';
import { ArrowLeftIcon, ArrowUpIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: PostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    authors: [{ url: 'https://ausathikram.com', name: 'Ausath Ikram' }],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `https://ausathikram.com/blog/${post.slug}`,
      siteName: 'Ausath Ikram',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(
            post.metadata.title
          )}`,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
    },
  };
}

export default async function Page(props: PostPageProps) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `${baseUrl}/api/og?title=${encodeURIComponent(
              post.metadata.title
            )}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Ausath Ikram',
            },
          }),
        }}
      />
      <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base">
        <h1 className="not-prose text-xl text-primary">
          {post.metadata.title}
        </h1>
        <p className="mt-2 not-prose text-muted-foreground">
          Ausath Ikram <span className="text-primary">&bull;</span>{' '}
          {formatDate(post.metadata.publishedAt)}{' '}
        </p>
        <CustomMDX source={post.content} />
        <Link className="not-prose w-fit flex items-center gap-2" href="/blog">
          <ArrowLeftIcon size={16} />
          <span>Blog</span>
        </Link>
      </article>
      <TableOfContents content={post.content} />
    </>
  );
}

function TableOfContents({ content }: { content: string }) {
  const tableOfContents = getTableOfContents(content);

  return (
    <aside className="hidden xl:block fixed right-36 top-28 w-64 opacity-60 hover:opacity-100 transition-opacity  prose prose-zinc dark:prose-invert prose-sm prose-li:mb-2">
      <p className="not-prose text-primary font-semibold mb-4">On this page</p>
      <nav>
        <ul>
          {tableOfContents.map((heading) => (
            <li key={heading.slug}>
              <a key={heading.slug} href={`#${heading.slug}`}>
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="not-prose w-fit flex items-center gap-2 mt-4" href="#top">
        <ArrowUpIcon size={16} />
        <span>Back to top</span>
      </a>
    </aside>
  );
}
