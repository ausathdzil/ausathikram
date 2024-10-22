import { StaticImageData } from 'next/image';
import nasaApodGallery from '../../public/projects/apod-gallery-nasa.png';
import ausathikram from '../../public/projects/ausathikram.png';
import bookshelf from '../../public/projects/bookshelf.png';
import dignition from '../../public/projects/dignition.png';
import memovies from '../../public/projects/memovies.png';
import moneasy from '../../public/projects/moneasy.png';

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: StaticImageData;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'dignition',
    slug: 'dignition',
    description: 'study club learning management system',
    image: dignition,
    link: 'https://dignition.androidupnvj.com/',
  },
  {
    id: 2,
    title: 'memovies',
    slug: 'memovies',
    description: 'letterboxd clone',
    image: memovies,
    link: 'https://memovies.vercel.app/',
    repo: 'https://github.com/ausathdzil/memovies',
  },
  {
    id: 3,
    title: 'bookshelf',
    slug: 'bookshelf',
    description: 'goodreads clone',
    image: bookshelf,
    link: 'https://bookshelf-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/bookshelf',
  },
  {
    id: 4,
    title: 'nasa apod gallery',
    slug: 'nasa-apod-gallery',
    description: 'collection of nasa astronomy picture of the day',
    image: nasaApodGallery,
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    id: 5,
    title: 'moneasy',
    slug: 'moneasy',
    description: 'msme financial management system',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
  {
    id: 6,
    title: 'ausathikram',
    slug: 'ausathikram',
    description: 'this website :)',
    image: ausathikram,
    link: 'https://ausathikram.vercel.app/',
    repo: 'https://github.com/ausathdzil/ausathikram',
  },
];
