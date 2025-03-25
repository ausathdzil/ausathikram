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
          url: `${baseUrl}/api/og?title=${encodeURIComponent(
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
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-4xl font-semibold">{post.metadata.title}</h1>
        <p className="text-muted-foreground">
          {formatDate(post.metadata.publishedAt)} &bull; Ausath Ikram
        </p>
      </article>
      <TableOfContents content={post.content} />
      <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base">
        <CustomMDX source={post.content} />
      </article>
      <Link className="w-fit flex items-center gap-2" href="/blog">
        <ArrowLeftIcon size={16} />
        <span>Blog</span>
      </Link>
    </section>
  );
}

function TableOfContents({ content }: { content: string }) {
  const tableOfContents = getTableOfContents(content);

  return (
    <aside className="hidden xl:block fixed right-36 top-24 w-64 opacity-60 hover:opacity-100 transition-opacity">
      <div className="p-4 prose prose-zinc dark:prose-invert prose-sm prose-li:mb-2">
        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
        <nav>
          <ul>
            {tableOfContents.map((heading) => (
              <li key={heading.slug}>
                <a href={`#${heading.slug}`}>{heading.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="w-fit flex items-center gap-2 mt-4 hover:underline underline-offset-4"
          href="#top"
        >
          <ArrowUpIcon size={16} />
          <span>Back to top</span>
        </a>
      </div>
    </aside>
  );
}
