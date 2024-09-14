import { StaticImageData } from 'next/image';
import dignition from '../../public/projects/dignition.png';
import bookshelf from '../../public/projects/bookshelf.png';
import nasaApodGallery from '../../public/projects/nasa-apod-gallery.png';
import moneasy from '../../public/projects/moneasy.png';
import ausathikram from '../../public/projects/ausathikram.png';
import reactCalculator from '../../public/projects/react-calculator.png';

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
    title: 'bookshelf',
    slug: 'bookshelf',
    description: 'my attempt at cloning goodreads',
    image: bookshelf,
    link: 'https://bookshelf-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/bookshelf',
  },
  {
    id: 3,
    title: 'nasa apod gallery',
    slug: 'nasa-apod-gallery',
    description: 'collection of nasa astronomy picture of the day',
    image: nasaApodGallery,
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    id: 4,
    title: 'moneasy',
    slug: 'moneasy',
    description: 'msme financial management system',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
  {
    id: 5,
    title: 'ausathikram',
    slug: 'ausathikram',
    description: 'this website :)',
    image: ausathikram,
    link: 'https://ausathikram.vercel.app/',
    repo: 'https://github.com/ausathdzil/ausathikram',
  },
  {
    id: 6,
    title: 'react calculator',
    slug: 'react-calculator',
    description: 'simple calculator using react',
    image: reactCalculator,
    link: 'https://react-calculator-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/react-calculator',
  },
  {
    id: 7,
    title: 'sea salon',
    slug: 'sea-salon',
    description: 'salon management system',
    repo: 'https://github.com/ausathdzil/sea-salon',
  },
  {
    id: 8,
    title: 'hotel express',
    slug: 'hotel-express',
    description: 'hotel management system',
    repo: 'https://github.com/ausathdzil/hotel-express',
  },
  {
    id: 9,
    title: 'bookshelf api',
    slug: 'bookshelf-api',
    description: 'simple bookshelf api',
    repo: 'https://github.com/ausathdzil/bookshelf-api',
  },
];
