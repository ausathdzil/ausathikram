import type { StaticImageData } from 'next/image';

import critix from '../../public/critix.png';
import emergensee from '../../public/emergensee.png';
import seaCatering from '../../public/sea-catering.png';
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
    title: 'SEA Catering',
    slug: 'sea-catering',
    description: 'Web application for a catering business.',
    image: seaCatering,
    link: 'https://sea-catering.vercel.app/',
    repo: 'https://github.com/ausathdzil/sea-catering',
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
