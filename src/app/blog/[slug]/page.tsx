import CustomMDX from '@/components/blog/custom-mdx';
import { formatDate, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  return {
    title: post?.metadata.title,
    description: post?.metadata.summary,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full max-w-3xl py-12 space-y-8 prose prose-zinc dark:prose-invert prose-sm sm:prose-base lg:prose-lg">
      <article className="not-prose">
        <h1 className="text-3xl md:text-5xl text-foreground font-bold">
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
