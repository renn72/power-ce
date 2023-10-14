
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

export const compDateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx, }) => {
    const compDates = await ctx.prisma.compDate.findMany()
    return compDates
  }),
  getAllUser: privateProcedure
    .input(z.object({ userId: z.string(), }))
    .query(async ({
      ctx, input,
    }) => {
      const compDates = await ctx.prisma.compDate.findMany({
        where: { userId: input.userId, },
        orderBy: { createdAt: 'desc', },
      })
      return compDates
    }),
  getUser: privateProcedure
    .input(z.object({ userId: z.string(), }))
    .query(async ({
      ctx, input,
    }) => {
      const compDates = await ctx.prisma.compDate.findFirst({
        where: { userId: input.userId, },
        orderBy: { createdAt: 'desc', },
      })
      return compDates
    }),
  create: privateProcedure
    .input(z.object({
      name: z.string(), date: z.string(), userId: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const compDate = await ctx.prisma.compDate.create({
        data: {
          name: input.name,
          date: input.date,
          userId: input.userId,
        },
      })
      return compDate
    }),

  delete: privateProcedure
    .input(z.object({
      name: z.string(), date: z.string(), userId: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const compDate = await ctx.prisma.compDate.deleteMany({
        where: {
          name: input.name,
          date: input.date,
          userId: input.userId,
        },
      })
      return compDate
    }),
})
