import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  const posts = getBlogPosts();
  return Response.json(posts);
}
