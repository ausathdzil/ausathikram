import { StaticImageData } from 'next/image';
import critix from '../../public/critix.png';
import humi from '../../public/humi.png';
import nasaApodGallery from '../../public/nasa-apod-gallery.png';

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
];
