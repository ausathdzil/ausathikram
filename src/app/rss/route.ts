import { getBlogPosts } from '@/lib/blog';
import { baseUrl } from '@/lib/utils';

export function GET() {
  const posts = getBlogPosts();

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const items = sortedPosts
    .map(
      (post) => `
        <item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid>${baseUrl}/blog/${post.slug}</guid>
          <description>${post.metadata.summary}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>
      `
    )
    .join('');

  const lastBuildDate = sortedPosts.length > 0
    ? new Date(sortedPosts[0].metadata.updatedAt || sortedPosts[0].metadata.publishedAt).toUTCString()
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Ausath Ikram</title>
        <link>${baseUrl}</link>
        <description>Ausath Ikram's blog RSS feed</description>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
