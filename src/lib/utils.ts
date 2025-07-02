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
  let formattedDate = date;
  if (!formattedDate.includes('T')) {
    formattedDate = `${formattedDate}T00:00:00`;
  }
  const targetDate = new Date(formattedDate);

  const fullDate = targetDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return fullDate;
}

export function slugify(str: string) {
  const spaceRegex = /\s+/g; // Match spaces
  const andRegex = /&/g; // Match &
  const nonWordRegex = /[^\w\-]+/g; // Match all non-word characters except for -
  const multipleDashRegex = /\-\-+/g; // Match multiple -

  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(spaceRegex, '-')
    .replace(andRegex, '-and-')
    .replace(nonWordRegex, '')
    .replace(multipleDashRegex, '-');
}

export function getTableOfContents(content: string) {
  const headingRegex = /^#+\s+(.*)$/gm; // Match headings
  const matches = content.match(headingRegex);
  if (!matches) {
    return [];
  }

  return matches.map((match) => {
    const levelRegex = /^#+/; // Match the number of #s
    const titleRegex = /^#+\s+(.*)$/; // Match the title
    const level = match.match(levelRegex)?.[0].length;
    const title = match.replace(titleRegex, '');
    const slug = slugify(title);

    return {
      level,
      title,
      slug,
    };
  });
}
