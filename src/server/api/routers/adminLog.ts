
import { z } from 'zod'

import { createTRPCRouter, privateProcedure, } from '~/server/api/trpc'

export const adminLogRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const records = await ctx.prisma.log.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return records
  }),
  deleteAll: privateProcedure
    .mutation(async ({ ctx, }) => {
      const record = await ctx.prisma.log.deleteMany()

      return record
    }),
})
