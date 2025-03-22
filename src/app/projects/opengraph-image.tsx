import OpengraphImage from '@/components/opengraph-image';

export const runtime = 'edge';

export const alt = 'Projects';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return OpengraphImage({ title: 'Projects', size: size });
}
