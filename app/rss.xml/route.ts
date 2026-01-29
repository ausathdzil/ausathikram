import { compareDesc } from 'date-fns'

import { getPostsSlugs } from '@/lib/utils'

export async function GET() {
  const slugs = await getPostsSlugs()
  const posts = await Promise.all(slugs.map(getPostMetadata))

  const sortedPosts = posts.sort((a, b) =>
    compareDesc(new Date(a.pubDate), new Date(b.pubDate))
  )

  const items = sortedPosts
    .map(
      (post) => `<item>
        <title><![CDATA[${post.title}]]></title>
        <link>${post.url}</link>
        <description><![CDATA[${post.description}]]></description>
        <guid isPermaLink="true">${post.url}</guid>
        <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
        <updated>${new Date(post.updated).toUTCString()}</updated>
      </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Ausath Ikram</title>
        <link>https://ausathikram.com</link>
        <description>Ausath Ikram's RSS feed</description>
        <atom:link href="https://ausathikram.com/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en-US</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

async function getPostMetadata(slug: string) {
  const { metadata } = await import(`@/app/blog/${slug}/page.mdx`)

  return {
    title: metadata.title,
    description: metadata.description,
    pubDate: metadata.pubDate,
    updated: metadata.updated || metadata.pubDate,
    url: `https://ausathikram.com/blog/${slug}`,
  }
}
