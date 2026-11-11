import Link from 'next/link'

export function Nav() {
  return (
    <nav className="flex flex-col gap-4 *:max-w-fit">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/rss.xml">RSS</Link>
      <Link href="/sitemap.xml">Sitemap</Link>
    </nav>
  )
}
