import { format } from 'date-fns';

import { getBlogPosts } from '@/lib/blog';
import { baseUrl, sortByDateDesc, toHtml } from '@/lib/utils';

const RSS_DATE_FORMAT = "EEE, dd MMM yyyy HH:mm:ss 'GMT'";

export async function GET() {
  const posts = getBlogPosts();
  const sortedPosts = sortByDateDesc(posts);

  const items = await Promise.all(
    sortedPosts.map(async (post) => {
      const contentHtml = await toHtml(post.content);
      return `
        <item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
          <description>${post.metadata.summary}</description>
          <author>mail@ausathikram.com (Ausath Ikram)</author>
          <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
          <pubDate>${format(new Date(post.metadata.publishedAt), RSS_DATE_FORMAT)}</pubDate>
        </item>
      `;
    })
  ).then((items) => items.join(''));

  const lastBuildDate =
    sortedPosts.length > 0
      ? format(
          new Date(
            sortedPosts[0].metadata.updatedAt ||
              sortedPosts[0].metadata.publishedAt
          ),
          RSS_DATE_FORMAT
        )
      : format(new Date(), RSS_DATE_FORMAT);

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
