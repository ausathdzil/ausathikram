import BlogPosts from '@/components/blog/blog-posts';

export const metadata = {
  title: 'Blog',
  description: 'Ausath Ikram blog.',
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-semibold">My Blog</h1>
        <p>Welcome to my personal headspace {':)'}</p>
      </article>
      <BlogPosts />
    </section>
  );
}
