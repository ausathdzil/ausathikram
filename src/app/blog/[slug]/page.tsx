import CustomMDX from '@/components/blog/custom-mdx';
import { getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full max-w-2xl py-12 space-y-12">
      <div>
        <h1 className="text-5xl text-foreground font-bold">
          {post.metadata.title}
        </h1>
        <p>{post.metadata.publishedAt}</p>
      </div>
      <article className="space-y-4">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
