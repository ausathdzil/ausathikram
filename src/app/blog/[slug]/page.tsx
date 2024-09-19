import { getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full max-w-3xl py-12">
      <h1 className="text-3xl text-foreground font-bold">
        {post.metadata.title}
      </h1>
      <p>{post.metadata.publishedAt}</p>
    </section>
  );
}
