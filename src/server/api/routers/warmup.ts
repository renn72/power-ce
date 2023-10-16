
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const warmupsRouter = createTRPCRouter({
  get: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const warmup = await ctx.prisma.warmupTemplate.findUnique({
        where: { id },
        include: {
          warmup: true,
        },
      })

      return warmup
    }),
})
