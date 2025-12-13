import { ArrowLeftIcon, ArrowUpIcon } from 'lucide-react';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import type { BlogPosting, WithContext } from 'schema-dts';

import { CustomMDX } from '@/components/custom-mdx';
import { getBlogPost, getBlogPostsMetadata } from '@/lib/blog';
import { baseUrl, formatDate, getTableOfContents } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getBlogPostsMetadata();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

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
      publishedTime: post.metadata.publishedAt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: 'Ausath Ikram',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
    },
  };
}

export default async function Page({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const tableOfContents = getTableOfContents(post.content);

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    datePublished: new Date(post.metadata.publishedAt).toISOString(),
    dateModified: new Date(
      post.metadata.updatedAt || post.metadata.publishedAt
    ).toISOString(),
    description: post.metadata.summary,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Ausath Ikram',
      url: baseUrl,
    },
  };

  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  };

  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      />
      <article className="prose prose-neutral dark:prose-invert">
        <h1 className="font-medium">{post.metadata.title}</h1>
        <p>
          Ausath Ikram <span className="text-primary">&bull;</span>{' '}
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
        </p>
        <CustomMDX options={options} source={post.content} />
      </article>
      <Link
        className="not-prose mt-8 flex w-fit items-center gap-2"
        href="/blog"
      >
        <ArrowLeftIcon size={16} />
        <span>Blog</span>
      </Link>
      <aside className="prose prose-neutral dark:prose-invert fixed top-24 right-28 prose-li:mb-2 hidden w-64 opacity-60 hover:opacity-100 xl:block">
        <p className="not-prose mb-4 font-semibold text-primary">
          On this page
        </p>
        <nav>
          <ul>
            {tableOfContents.map((heading) => (
              <li key={heading.slug}>
                <a className="not-prose" href={`#${heading.slug}`}>
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="not-prose mt-4 flex w-fit items-center gap-2" href="#top">
          <ArrowUpIcon size={16} />
          <span>Back to top</span>
        </a>
      </aside>
    </>
  );
}
