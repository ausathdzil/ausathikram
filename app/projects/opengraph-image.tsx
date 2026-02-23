import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

export const alt = 'Projects'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return await createOGImage({
    children: 'Projects',
  })
}
