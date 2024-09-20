import CustomMDX from '@/components/blog/custom-mdx';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  return {
    title: post?.metadata.title,
    description: post?.metadata.summary,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full max-w-2xl py-12 space-y-8">
      <article className="space-y-2">
        <h1 className="text-5xl text-foreground font-bold">
          {post.metadata.title}
        </h1>
        <p>{post.metadata.publishedAt}</p>
      </article>
      <article className="prose prose-zinc dark:prose-invert prose-sm sm:prose-base lg:prose-lg">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
