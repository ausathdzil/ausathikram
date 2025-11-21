import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/blog';
import { baseUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt,
  }));

  const routes = ['', '/blog', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
