import { compareDesc, format } from 'date-fns'
import Link from 'next/link'

import { getBlogPosts } from '@/lib/blog'

export async function LatestPosts() {
  const posts = await getBlogPosts()
  const sortedPosts = posts
    .sort((a, b) => compareDesc(new Date(a.pubDate), new Date(b.pubDate)))
    .slice(0, 5)

  return sortedPosts.map((post) => (
    <div className="prose-p:mt-2 prose-h3:mb-2" key={post.url}>
      <h3>
        <Link href={post.url}>{post.title}</Link>
      </h3>
      <time dateTime={post.pubDate}>
        {format(new Date(post.pubDate), 'MMMM d, yyyy')}
      </time>
      <p>{post.description}</p>
      <hr />
    </div>
  ))
}
