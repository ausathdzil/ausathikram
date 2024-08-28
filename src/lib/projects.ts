export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'dignition',
    slug: 'dignition',
    description: 'study club learning management system',
    image: '/projects/dignition.png',
    link: 'https://dignition.androidupnvj.com/',
  },
  {
    id: 2,
    title: 'bookshelf',
    slug: 'bookshelf',
    description: 'my attempt at cloning goodreads',
    image: '/projects/bookshelf.png',
    link: 'https://bookshelf-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/bookshelf',
  },
  {
    id: 3,
    title: 'nasa apod gallery',
    slug: 'nasa-apod-gallery',
    description: 'collection of nasa astronomy picture of the day',
    image: '/projects/nasa-apod-gallery.png',
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    id: 4,
    title: 'sea salon',
    slug: 'sea-salon',
    description: 'salon management system',
    repo: 'https://github.com/ausathdzil/sea-salon',
  },
  {
    id: 5,
    title: 'ausathikram',
    slug: 'ausathikram',
    description: 'this website :)',
    image: '/projects/ausathikram.png',
    link: 'https://ausathikram.vercel.app/',
    repo: 'https://github.com/ausathdzil/ausathikram',
  },
  {
    id: 6,
    title: 'moneasy',
    slug: 'moneasy',
    description: 'msme financial management system',
    image: '/projects/moneasy.png',
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
  {
    id: 7,
    title: 'hotel express',
    slug: 'hotel-express',
    description: 'hotel management system',
    repo: 'https://github.com/ausathdzil/hotel-express',
  },
  {
    id: 8,
    title: 'react calculator',
    slug: 'react-calculator',
    description: 'simple calculator using react',
    image: '/projects/react-calculator.png',
    link: 'https://react-calculator-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/react-calculator',
  },
  {
    id: 9,
    title: 'bookshelf api',
    slug: 'bookshelf-api',
    description: 'simple bookshelf api',
    repo: 'https://github.com/ausathdzil/bookshelf-api',
  },
];
