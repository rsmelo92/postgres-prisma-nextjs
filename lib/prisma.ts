import { PrismaClient } from '@prisma/client'
import type { PrismaClient as TPrismaClient } from '@prisma/client'

declare global {
  var prisma: TPrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
