import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ausathikram.com'
    : 'http://localhost:3000';

export function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return fullDate;
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export function getTableOfContents(content: string) {
  const headingRegex = /^#+\s+(.*)$/gm; // Match headings
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
