import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const CPB = searchParams.get('CPB');
  const result = await prisma.movie.findFirst({
    where: {
      SEGMENTO_DESTINACAO_INICIAL: "SALAS DE EXIBIÇÃO",
      CPB,
    },
  })
  return new Response(JSON.stringify(result));
}
