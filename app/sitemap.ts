import { getPostsSlugs } from '@/lib/utils'

export default async function sitemap() {
  const slugs = await getPostsSlugs()

  const posts = slugs.map((slug) => ({
    url: `https://ausathikram.com/blog/${slug}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = ['', '/blog'].map((route) => ({
    url: `https://ausathikram.com${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...posts]
}
