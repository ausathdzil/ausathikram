import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ausathikram.com'
    : 'http://localhost:3000';

export function formatDate(date: string, showYear = true) {
  let formattedDate = date;
  if (!formattedDate.includes('T')) {
    formattedDate = `${formattedDate}T00:00:00`;
  }
  const targetDate = new Date(formattedDate);

  const fullDate = targetDate.toLocaleString('en-ID', {
    month: 'long',
    day: 'numeric',
    year: showYear ? 'numeric' : undefined,
  });

  return fullDate;
}

const spaceRegex = /\s+/g; // Match spaces
const andRegex = /&/g; // Match &
const nonWordRegex = /[^\w-]+/g; // Match all non-word characters except for -
const multipleDashRegex = /--+/g; // Match multiple -

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(spaceRegex, '-')
    .replace(andRegex, '-and-')
    .replace(nonWordRegex, '')
    .replace(multipleDashRegex, '-');
}

const headingLevelRegex = /^#+/; // Match the number of #s
const headingRegex = /^#+\s+(.*)$/gm; // Match headings
const headingTitleRegex = /^#+\s+/; // Match the title

export function getTableOfContents(content: string) {
  const matches = content.match(headingRegex);
  if (!matches) {
    return [];
  }

  return matches.map((match) => {
    const level = match.match(headingLevelRegex)?.[0].length;
    const title = match.replace(headingTitleRegex, '');
    const slug = slugify(title);

    return {
      level,
      title,
      slug,
    };
  });
}
