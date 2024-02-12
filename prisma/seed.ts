import path from 'path';
import fs, { readFileSync } from 'fs';

import prisma from '../lib/prisma'

import { Movie } from '@/types';

const SEED_PATH = '/prisma/seed'

const getData = () => {
  const dirPath = path.join(process.cwd(), SEED_PATH);
  const folders = fs.readdirSync(dirPath);
  const results = []
  for (const file of folders) {
    const filePath = path.join(process.cwd(), `${SEED_PATH}/${file}`);
    const buffer = readFileSync(filePath);
    const { data } = JSON.parse(buffer.toString()) as { data: Movie[] }
    results.push(data)
  }
  const movies = results.flat();
  return movies
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
        id: crypto.randomUUID().toString(),
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
