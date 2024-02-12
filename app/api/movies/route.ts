import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') ?? "";
  if(cursor === "") {
    const result = await prisma.movie.findMany({
      take: 10,
      orderBy: {
        id: "asc"
      },
    })
    return new Response(JSON.stringify(result));
  }

  const result = await prisma.movie.findMany({
    take: 10,
    skip: 1,
    orderBy: {
      id: "asc"
    },
    cursor: { id: cursor }
  })
  return new Response(JSON.stringify(result));
}
