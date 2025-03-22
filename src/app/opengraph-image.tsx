import OpengraphImage from '@/components/opengraph-image';

export const runtime = 'edge';

export const alt = 'Ausath Ikram';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return OpengraphImage({ title: 'Ausath Ikram', size: size });
}
