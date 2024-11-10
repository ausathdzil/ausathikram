import CustomMDX from '@/components/blog/custom-mdx';
import { formatDate, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  return {
    title: post?.metadata.title,
    description: post?.metadata.summary,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full space-y-8 prose prose-zinc dark:prose-invert prose-sm sm:prose-base lg:prose-lg">
      <article className="not-prose space-y-2">
        <h1 className="text-3xl md:text-5xl text-foreground font-semibold">
          {post.metadata.title}
        </h1>
        <p>{formatDate(post.metadata.publishedAt)}</p>
      </article>
      <article>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
