import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const daysRouter = createTRPCRouter({
  get: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const day = await ctx.prisma.day.findUnique({
        where: {
          id: input.id,
        },
        include: {
          exercise: { include: { ss: true, set: true } },
        },
      })
      return day
    }),
  completeDay: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const day = await ctx.prisma.day.update({
        where: {
          id: input.id,
        },
        data: {
          isComplete: true,
        },
      })
      return day
    }),

})
