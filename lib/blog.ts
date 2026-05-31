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

  const slugs: string[] = []

  for (const entry of entries) {
    if (!entry.isFile() || entry.name !== 'page.mdx') {
      continue
    }

    const relativePath = path.relative(
      dir,
      path.join(entry.parentPath, entry.name),
    )

    const slug = path.dirname(relativePath).replace(/\\/g, '/')

    if (slug !== '.') {
      slugs.push(slug)
    }
  }

  return slugs
}

async function getPostMetadata(slug: string) {
  const { metadata } = await import(`@/app/blog/${slug}/page.mdx`)

  return {
    title: metadata.title,
    description: metadata.description,
    pubDate: metadata.pubDate,
    updated: metadata.updated || metadata.pubDate,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
  }
}
