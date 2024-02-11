
export const runtime = 'nodejs';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const hasCursor = Boolean(cursor);
  const cursorPayload = hasCursor ? { cursor: { id: cursor } } : {};
  const payload = {
    take: 10,
    skip: hasCursor ? 1 : 0,
    ...cursorPayload,
    orderBy: {
      id: 'asc',
    },
  }
  const result = await prisma.movie.findMany(payload)
  return new Response(JSON.stringify(result));
}
