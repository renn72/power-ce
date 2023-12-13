import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const liftRouter = createTRPCRouter({

  getAll: privateProcedure.query(async ({ ctx, }) => {
    const userId = ctx.userId || ''
    const lifts = await ctx.prisma.lifts.findMany({ where: { userId: userId, },})
    return lifts
  }),

  create: privateProcedure
    .input(z.object(
      {
        liftId: z.string(),
        liftName: z.string(),
        weight: z.number(),
        reps: z.number(),

      }
    ))
    .mutation(async ({
      ctx, input,
    }) => {

      const userId = ctx.userId || ''

      const lift = await ctx.prisma.lift.create({
        data: {
          userId: userId,
          weight: input.weight,
          reps: input.reps,
          liftName: input.liftName,
          lift: { connect: { id: input.liftId, }, },
        },

      })
      return lift

    }),

})
