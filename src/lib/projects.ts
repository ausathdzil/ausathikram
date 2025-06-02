import { StaticImageData } from 'next/image';
import critix from '../../public/critix.png';
import emergensee from '../../public/emergensee.png';
import humi from '../../public/humi.png';
import moneasy from '../../public/moneasy.png';
import nasaApodGallery from '../../public/nasa-apod-gallery.png';
import silatik from '../../public/silatik.png';

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
    title: 'Critix',
    slug: 'critix',
    description: 'Movie review platform.',
    image: critix,
    link: 'https://critix.vercel.app/',
    repo: 'https://github.com/ausathdzil/critix',
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
    title: 'EmergenSee',
    slug: 'emergensee',
    description: 'Real-time public health early warning platform.',
    image: emergensee,
    link: 'https://emergensee.vercel.app/',
    repo: 'https://github.com/ausathdzil/emergensee',
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
    title: 'Silatik',
    slug: 'silatik',
    description: 'Client portal for silatik platform.',
    image: silatik,
    link: 'https://silatik-web.vercel.app/',
    repo: 'https://github.com/ausathdzil/silatik-web',
  },
  {
    title: 'Moneasy',
    slug: 'moneasy',
    description: 'Finance management platform integrated with AI.',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
];
