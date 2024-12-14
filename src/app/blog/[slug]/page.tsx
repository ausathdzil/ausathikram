import CustomMDX from '@/components/blog/custom-mdx';
import { formatDate, getBlogPosts, getTableOfContents } from '@/lib/blog';
import { ArrowUp } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
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
        <h1 className="text-4xl text-foreground font-semibold">
          {post.metadata.title}
        </h1>
        <p>{formatDate(post.metadata.publishedAt)}</p>
      </article>
      <TableOfContents content={post.content} />
      <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

function TableOfContents({ content }: { content: string }) {
  const tableOfContents = getTableOfContents(content);

  return (
    <aside className="hidden xl:block fixed right-36 w-64 opacity-60 hover:opacity-100 transition-opacity duration-200">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Table of Contents
        </h2>
        <nav className="prose prose-zinc dark:prose-invert prose-sm prose-ul:space-y-2">
          <ul>
            {tableOfContents.map((heading) => (
              <li key={heading.slug}>
                <a href={`#${heading.slug}`}>{heading.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="flex items-center gap-2 mt-4 prose prose-zinc dark:prose-invert prose-sm"
          href="#top"
        >
          <ArrowUp size={16} />
          <span>Back to top</span>
        </a>
      </div>
    </aside>
  );
}
