import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

export const alt = 'Ausath Ikram'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return await createOGImage({
    children: 'Ausath Ikram',
  })
}
