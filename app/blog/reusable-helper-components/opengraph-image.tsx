import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

const title = 'Components with Search Params as State'

export const alt = title
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return createOGImage({
    children: title,
  })
}
