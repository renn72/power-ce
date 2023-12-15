import { z } from 'zod'

import { createTRPCRouter, privateProcedure, publicProcedure } from '~/server/api/trpc'

export const recordsRouter = createTRPCRouter({
  get: privateProcedure
    .input(z.object({ gender: z.string(), wc: z.string() }))
    .query(async ({ ctx, input }) => {
      const record = await ctx.prisma.record.findMany({
        where: {
          gender: input.gender,
          wc: input.wc,
        },
      })

      return record
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const records = await ctx.prisma.record.findMany({
      orderBy: {
        weight: 'desc',
      },
    })

    return records
  }),
  create: privateProcedure
    .input(
      z.object({
        date: z.string(),
        lift: z.string(),
        wc: z.string(),
        gender: z.string(),
        name: z.string(),
        weight: z.number(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.prisma.record.create({
        data: {
          date: input.date,
          lift: input.lift,
          wc: input.wc,
          gender: input.gender,
          name: input.name,
          weight: input.weight,
          userId: input.userId,
        },
      })

      return record
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
