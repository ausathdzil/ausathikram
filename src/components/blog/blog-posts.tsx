import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';

export default function BlogPosts() {
  let posts = getBlogPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
          <p>{post.metadata.publishedAt}</p>
        </li>
      ))}
    </ul>
  );
}
