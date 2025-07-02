import { getBlogPosts } from '@/lib/blog';
import { baseUrl } from '@/lib/utils';

export function GET() {
  const posts = getBlogPosts();

  const items = posts
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .map((post) => {
      return `
        <item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Ausath Ikram</title>
        <link>${baseUrl}</link>
        <description>Ausath Ikram's blog RSS feed</description>
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
