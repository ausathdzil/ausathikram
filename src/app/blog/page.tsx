import BlogPosts from '@/components/blog/blog-posts';

export const metadata = {
  title: 'blog',
  description: 'ausath ikram blog.',
};

export default function Page() {
  return (
    <section className="w-full max-w-3xl py-12 space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-semibold">My Blog</h1>
        <p>Welcome to my personal headspace {':)'}</p>
      </article>
      <BlogPosts />
    </section>
  );
}
