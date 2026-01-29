import fs from 'node:fs/promises'
import path from 'node:path'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const backslashRegex = /\\/g

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
    .map((slug) => slug.replace(backslashRegex, '/'))
}
