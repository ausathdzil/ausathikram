import OpengraphImage from '@/components/opengraph-image';

export const runtime = 'edge';

export const alt = 'Blog';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const title = slug.replace(/-/g, ' ');

  return OpengraphImage({ title: title, size: size });
}
