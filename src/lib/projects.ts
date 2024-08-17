export type Project = {
  id: number;
  title: string;
  description: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'dignition',
    description: 'study club learning management system',
    link: 'https://dignition.androidupnvj.com/',
  },
  {
    id: 2,
    title: 'bookshelf',
    description: 'my attempt at cloning goodreads',
    repo: 'https://github.com/ausathdzil/bookshelf',
  },
  {
    id: 3,
    title: 'nasa apod gallery',
    description: 'collection of nasa astronomy picture of the day',
    link: 'https://apod-gallery-nasa.vercel.app/',
    repo: 'https://github.com/ausathdzil/nasa-apod-gallery',
  },
  {
    id: 4,
    title: 'sea salon',
    description: 'salon management system',
    link: 'https://sea-salon-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/sea-salon',
  },
  {
    id: 5,
    title: 'ausathikram',
    description: 'this website :)',
    link: 'https://ausathikram.vercel.app/',
    repo: 'https://github.com/ausathdzil/ausathikram',
  },
  {
    id: 6,
    title: 'moneasy',
    description:
      'msme financial management system',
    link: 'https://moneasy.vercel.app/',
    repo: 'https://github.com/valuin/moneasy',
  },
  {
    id: 7,
    title: 'hotel express',
    description: 'hotel management system',
    repo: 'https://github.com/ausathdzil/hotel-express',
  },
  {
    id: 8,
    title: 'react calculator',
    description: 'simple calculator using react',
    link: 'https://react-calculator-ausath.vercel.app/',
    repo: 'https://github.com/ausathdzil/react-calculator',
  },
  {
    id: 9,
    title: 'bookshelf api',
    description: 'simple bookshelf api',
    repo: 'https://github.com/ausathdzil/bookshelf-api',
  },
];
