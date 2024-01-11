
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
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.prisma.record.delete({
        where: {
          id: input.id,
        },
      })

      return record
    }),
})
