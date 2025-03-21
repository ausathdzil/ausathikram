import Opengraph from '@/components/opengraph';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Email';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(<Opengraph title="Email" />, {
    ...size,
  });
}
