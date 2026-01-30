import fs from 'node:fs/promises'
import path from 'node:path'

export async function getBlogPosts() {
  const slugs = await getPostsSlugs()
  return await Promise.all(slugs.map(getPostMetadata))
}

export async function getPostsSlugs() {
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
    .map((slug) => slug.replace(/\\/g, '/'))
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
