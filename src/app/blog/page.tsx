import { formatDate, getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ausath Ikram blog.",
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-primary font-semibold">Blog</h1>
        <p>Things that interest me, mostly about web development.</p>
      </article>
      <BlogPosts />
    </section>
  );
}

function BlogPosts() {
  const posts = getBlogPosts();

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <ul className="space-y-4">
      {sortedPosts.map((post) => (
        <li key={post.slug}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-8">
            <Link className="w-3/4" href={`/blog/${post.slug}`}>
              <h1 className="text-lg sm:text-xl text-primary">
                {post.metadata.title}
              </h1>
            </Link>
            <p className="">{formatDate(post.metadata.publishedAt)}</p>
          </div>
          <p className="w-3/4">{post.metadata.summary}</p>
        </li>
      ))}
    </ul>
  );
}
