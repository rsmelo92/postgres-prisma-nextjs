import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  
  const cursor = searchParams.get('cursor') ?? "";
  const query = searchParams.get('query') ?? "";
  console.log(query);
  console.log(JSON.parse(query));
  const payload = query ? JSON.parse(query) : {};
  
  if(cursor === "") {
    const result = await prisma.movie.findMany({
      where: {
        ...payload,
        SEGMENTO_DESTINACAO_INICIAL: "SALAS DE EXIBIÇÃO"
      },
      take: 10,
      orderBy: {
        id: "asc"
      },
    })
    console.log(result);
    
    return new Response(JSON.stringify(result));
  }

  const result = await prisma.movie.findMany({
    where: {
      ...payload,
      SEGMENTO_DESTINACAO_INICIAL: "SALAS DE EXIBIÇÃO"
    },
    take: 10,
    skip: 1,
    orderBy: {
      id: "asc"
    },
    cursor: { id: cursor }
  })
  return new Response(JSON.stringify(result));
}
