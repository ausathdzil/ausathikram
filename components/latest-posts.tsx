import Link from 'next/link'

import { getBlogPosts } from '@/lib/blog'

export async function LatestPosts() {
  const posts = await getBlogPosts()
  const sortedPosts = posts
    .sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )
    .slice(0, 5)

  return sortedPosts.map((post) => (
    <div className="prose-p:mt-2 prose-h3:mb-2" key={post.url}>
      <h3>
        <Link href={post.url}>{post.title}</Link>
      </h3>
      <time dateTime={post.pubDate}>
        {new Date(post.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <p>{post.description}</p>
    </div>
  ))
}
