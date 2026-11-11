import { getPostsSlugs } from '@/lib/blog'

export default async function sitemap() {
  const slugs = await getPostsSlugs()

  const posts = slugs.map((slug) => ({
    url: `https://ausathikram.com/blog/${slug}`,
    lastModified: new Date().toISOString(),
  }))

  return [
    {
      url: `https://ausathikram.com`,
      lastModified: new Date().toISOString(),
    },
    ...posts,
  ]
}
