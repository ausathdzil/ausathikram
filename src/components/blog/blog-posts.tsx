import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';

export default function BlogPosts() {
  let posts = getBlogPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.slug}
          className="flex items-center gap-4"
        >
          <p className="text-lg">{post.metadata.publishedAt}</p>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl text-foreground hover:underline underline-offset-4">
              {post.metadata.title}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
