
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
  create: privateProcedure
    .input(z.object({
      weight: z.number(), lift: z.string(), userId: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const onerm = await ctx.prisma.oneRepMax.upsert({
        where: {
          userId_lift: {
            userId: input.userId,
            lift: input.lift,
          },
        },
        update: { weight: input.weight, },
        create: {
          userId: input.userId, weight: input.weight, lift: input.lift,
        },
      })

      console.log('onerm', onerm)

      return onerm
    }),

  delete: privateProcedure
    .input(z.object({
      userId: z.string(), lift: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const onerm = await ctx.prisma.oneRepMax.delete(
        {
          where: {
            userId_lift: {
              userId: input.userId,
              lift: input.lift,
            },
          },
        }
      )
      return onerm
    }),
  deleteAll: privateProcedure
    .mutation(async ({ ctx, }) => {
      const onerm = await ctx.prisma.oneRepMax.deleteMany({})
      return onerm
    }),

})
