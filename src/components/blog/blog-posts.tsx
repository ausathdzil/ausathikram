import { getBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';

export default function BlogPosts() {
  let posts = getBlogPosts();

  let sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <ul>
      {sortedPosts.map((post) => (
        <li
          key={post.slug}
          className="flex items-center gap-4"
        >
          <p className="text-lg">{post.metadata.publishedAt}</p>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl text-foreground hover:underline underline-offset-4">
              {post.metadata.title}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
