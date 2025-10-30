import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/blog';
import { projects } from '@/lib/projects';
import { baseUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt,
  }));

  const projectsRoute = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    images: [`${baseUrl}/projects/${project.slug}.png`],
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const routes = ['', '/blog', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts, ...projectsRoute];
}
