import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

export interface Metadata {
  title: string;
  publishedAt: string;
  summary: string;
  updatedAt?: string;
}

export interface BlogPost {
  metadata: Metadata;
  slug: string;
  content: string;
}

const frontmatterRegex = /---\s*([\s\S]*?)\s*---/; // Match frontmatter block
const quotesRegex = /^['"](.*)['"]$/; // Match quotes

function parseFrontmatter(fileContent: string) {
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error('Frontmatter not found');
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(quotesRegex, '$1');
    metadata[key.trim() as keyof Metadata] = value;
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

const getCachedMDXData = cache((dir: string) => getMDXData(dir));

export function getBlogPosts(): BlogPost[] {
  return getCachedMDXData(path.join(process.cwd(), 'posts'));
}

export function getBlogPostsMetadata() {
  return getBlogPosts().map(({ metadata, slug }) => ({
    metadata,
    slug,
  }));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
