import path from 'path';
import fs from 'fs';

import prisma from '../lib/prisma'

import { Movie } from '@/types';

const SEED_PATH = '/prisma/seed/2024.json'

const getData = () => {
  const dirPath = path.join(process.cwd(), SEED_PATH);
  const buffer = fs.readFileSync(dirPath);
  const { data } = JSON.parse(buffer.toString()) as { data: Movie[] }
  return data
}

async function main() {
  const data = getData();
  const hasDB = await prisma.movie.count() > 0

  if(hasDB) {
    console.log("====> DB Already seeded");
    return;
  }
  console.log("====> Seeding DB...");

  for (const movie of data) {
    await prisma.movie.upsert({
      where: {
        id: movie.id ? movie.id : crypto.randomUUID().toString(),
      },
      create: movie,
      update: {},
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
