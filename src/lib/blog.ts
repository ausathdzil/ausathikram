import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/; // Match frontmatter block
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

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

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'posts'));
}

export function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return fullDate;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function slugify(str: any) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export function getTableOfContents(content: string) {
  const headingRegex = /^#+\s+(.*)$/gm;
  const matches = content.match(headingRegex);
  if (!matches) return [];

  return matches.map((match) => {
    const level = match.match(/^#+/)?.[0].length; // Get the number of #s
    const title = match.replace(/^#+\s+/, ''); // Remove the #s
    const slug = slugify(title);

    return {
      level,
      title,
      slug,
    };
  });
}
