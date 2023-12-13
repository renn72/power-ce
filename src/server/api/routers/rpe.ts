import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const rpeRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const rpe = await ctx.prisma.rPEIndex.findMany({
        where: { userId: input },
      })
      return rpe
    }),
  create: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const rpe = await ctx.prisma.rPEIndex.upsert({
        where: {
          userId_name: { userId: input.userId, name: input.name },
        },
        update: { value: input.value },
        create: { userId: input.userId, name: input.name, value: input.value },
      })
      return rpe
    }),
})
