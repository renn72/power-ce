
import { clerkClient, } from '@clerk/nextjs/server'
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const liftRouter = createTRPCRouter({

  create: privateProcedure
    .input(z.object(
      {
        liftId: z.string(),
        weight: z.number(),
        reps: z.number(),

      }
    ))
    .mutation(async ({
      ctx, input,
    }) => {

      const userId = ctx.userId

      const lift = await ctx.prisma.lift.create({
        data: {
          userId: userId,
          weight: input.weight,
          reps: input.reps,
          lift: { connect: { id: input.liftId, }, },
        },

      })
      return lift

    }),

})
