import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? "";
  if(query === "") return new Response();
  const result = await prisma.movie.findMany({
    where: {
      SEGMENTO_DESTINACAO_INICIAL: "SALAS DE EXIBIÇÃO",
      TITULO_ORIGINAL: {
        search: query,
        mode: 'insensitive'
      },
    },
    select: {
      TITULO_ORIGINAL: true,
      TIPO_OBRA: true,
      ANO_PRODUCAO_INICIAL: true,
      ANO_PRODUCAO_FINAL: true,
      CPB: true
    },
    take: 5,
    orderBy: {
      TITULO_ORIGINAL: "asc"
    },
  })
  return new Response(JSON.stringify(result));
}
