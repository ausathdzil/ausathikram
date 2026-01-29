import fs from 'node:fs/promises'
import path from 'node:path'

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

const backslashRegex = /\\/g

async function getPostsSlugs() {
  const dir = path.join(process.cwd(), 'app', 'blog')

  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  })

  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      )

      return path.dirname(relativePath)
    })
    .filter((slug) => slug !== '.')
    .map((slug) => slug.replace(backslashRegex, '/'))
}
