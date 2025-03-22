import OpengraphImage from '@/components/opengraph-image';

export const runtime = 'edge';

export const alt = 'Blog';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return OpengraphImage({ title: 'Blog', size: size });
}
