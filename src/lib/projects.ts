import { StaticImageData } from 'next/image';
import nasaApodGallery from '../../public/projects/apod-gallery-nasa.png';
import critix from '../../public/projects/critix.jpeg';
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
    title: 'Dignition',
    slug: 'dignition',
    description: 'Study club learning management system',
    image: dignition,
    link: 'https://dignition.androidupnvj.com/',
  },
  {
    id: 2,
    title: 'NASA APOD Gallery',
    slug: 'nasa-apod-gallery',
    description: 'Collection of NASA Astronomy Picture of the Day',
    image: nasaApodGallery,
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    id: 3,
    title: 'Critix',
    slug: 'critix',
    description: 'Movie review platform',
    image: critix,
    link: 'https://critix.vercel.app/',
    repo: 'https://github.com/ausathdzil/critix',
  },
  {
    id: 4,
    title: 'Memovies',
    slug: 'memovies',
    description: 'Letterboxd clone',
    image: memovies,
    link: 'https://memovies.vercel.app/',
    repo: 'https://github.com/ausathdzil/memovies',
  },
  {
    id: 6,
    title: 'Moneasy',
    slug: 'moneasy',
    description: 'MSME financial management system',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
];
