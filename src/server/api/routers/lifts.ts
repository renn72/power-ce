import { clerkClient, } from '@clerk/nextjs/server'
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const liftsRouter = createTRPCRouter({

  getAllUser: privateProcedure.query(async ({ ctx, }) => {
    const userId = ctx.userId
    const res = await ctx.prisma.lifts.findMany({
      where: { userId: userId, },
      include: { lift: true, },
    })
    const lifts = res.map((lift) => lift.name)
    if (!lifts.includes('Squat')) {
      await ctx.prisma.lifts.create({
        data: {
          name: 'Squat',
          userId: userId,
        },
      })
    }
    if (!lifts.includes('Bench')) {
      await ctx.prisma.lifts.create({
        data: {
          name: 'Bench',
          userId: userId,
        },
      })
    }
    if (!lifts.includes('Deadlift')) {
      await ctx.prisma.lifts.create({
        data: {
          name: 'Deadlift',
          userId: userId,
        },
      })
    }

    console.log('lifts', res)
    return res
  }),

  getAll: privateProcedure.query(async ({ ctx, }) => {
    const lifts = await ctx.prisma.lifts.findMany({})

    return lifts
  }),

  create: privateProcedure
    .input(z.object({ name: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {

      const liftName = await ctx.prisma.lifts.create({
        data: {
          name: input.name,
          userId: ctx.userId,
        },
      })
      return liftName

    }),

  delete: privateProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {
      const lift = await ctx.prisma.lifts.delete({ where: { id: input.id, }, })
      return lift
    }),

})
