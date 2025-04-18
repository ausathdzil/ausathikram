import { StaticImageData } from 'next/image';
import nasaApodGallery from '../../public/projects/apod-gallery-nasa.png';
import critix from '../../public/projects/critix.jpeg';
import dignition from '../../public/projects/dignition.png';
import moneasy from '../../public/projects/moneasy.png';
import humi from '../../public/projects/humi.png';

export type Project = {
  title: string;
  slug: string;
  description: string;
  image?: StaticImageData;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: 'Dignition',
    slug: 'dignition',
    description: "Student's study club learning management system.",
    image: dignition,
    link: 'https://dignition.androidupnvj.com/',
  },
  {
    title: 'Humi',
    slug: 'humi',
    description: 'AI music moodboard generator.',
    image: humi,
    link: 'https://humi.ausathikram.com/',
    repo: 'https://github.com/ausathdzil/humi',
  },
  {
    title: 'Critix',
    slug: 'critix',
    description: 'Movie review platform.',
    image: critix,
    link: 'https://critix.vercel.app/',
    repo: 'https://github.com/ausathdzil/critix',
  },
  {
    title: 'NASA APOD Gallery',
    slug: 'nasa-apod-gallery',
    description: 'Collection of NASA Astronomy Picture of the Day.',
    image: nasaApodGallery,
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    title: 'Moneasy',
    slug: 'moneasy',
    description: 'MSME financial management system.',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
];
