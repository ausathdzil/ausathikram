import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'
import { getPostMetadata } from '@/lib/blog'

const post = await getPostMetadata('reusable-helper-components')

export const alt = post.title
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return await createOGImage({
    children: post.title,
  })
}
