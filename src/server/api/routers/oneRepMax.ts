import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

export const oneRepMaxRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx, }) => {
    const onerm = await ctx.prisma.oneRepMax.findMany({})
    return onerm
  }),
  getUser: publicProcedure
    .query(async ({ ctx, }) => {
      const { userId, } = ctx
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to view this page',
        })
      }
      const onerm = await ctx.prisma.oneRepMax.findFirst({ where: { userId: userId, }, })
      return onerm
    }),
  getUserCoreLifts: privateProcedure.input(z.object({ userId: z.string(), }))
    .query(async ({ ctx, input }) => {
    const userId = input.userId
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to view this page',
        })
      }
      const onerm = await ctx.prisma.oneRepMax.findMany({
        orderBy: { createdAt: 'desc', },
        where: {
          userId: userId,
          lift: {
            in: [
              'squat',
              'bench',
              'deadlift',
            ],
          },
        },
      })
      return onerm
    }),
  create: privateProcedure
    .input(z.object({
      weight: z.number(), lift: z.string(), userId: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const onerm = await ctx.prisma.oneRepMax.create({
        data: {
          userId: input.userId, weight: input.weight, lift: input.lift,
        },
      })
      return onerm
    }),
})
