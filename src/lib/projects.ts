import { StaticImageData } from 'next/image';

import critix from '../../public/critix.png';
import emergensee from '../../public/emergensee.png';
import moneasy from '../../public/moneasy.png';
import silatik from '../../public/silatik.png';

export interface Project {
  title: string;
  slug: string;
  description: string;
  image?: StaticImageData;
  link?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'Silatik',
    slug: 'silatik',
    description: 'Client portal for silatik platform.',
    image: silatik,
    link: 'https://silatik-web.vercel.app/',
    repo: 'https://github.com/ausathdzil/silatik-web',
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
    title: 'Moneasy',
    slug: 'moneasy',
    description: 'Finance management platform integrated with AI.',
    image: moneasy,
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
  {
    title: 'Critix',
    slug: 'critix',
    description: 'Movie review platform.',
    image: critix,
    link: 'https://critix.vercel.app/',
    repo: 'https://github.com/ausathdzil/critix',
  },
];
