import { formatDate, getBlogPosts } from '@/lib/blog';
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
    <ul className="space-y-4">
      {sortedPosts.map((post) => (
        <li
          key={post.slug}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl text-foreground hover:underline underline-offset-4">
              {post.metadata.title}
            </h2>
          </Link>
          <p className="text-lg">{formatDate(post.metadata.publishedAt)}</p>
        </li>
      ))}
    </ul>
  );
}
