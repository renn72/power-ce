import { clerkClient, } from '@clerk/nextjs/server'
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const programsRouter = createTRPCRouter({

  updateDayEnergy: privateProcedure
    .input(z.object({
      id: z.string(), energyRating: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      // const authorId = ctx.userId;

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const programDay = await ctx.prisma.day.update({
        where: { id: input.id, },
        data: { energyRating: input.energyRating, },
      })

      return programDay
    }),
  completeExercise: privateProcedure
    .input(z.object({
      id: z.string(), isComplete: z.boolean(),
    })).mutation(async ({
      ctx, input,
    }) => {
      // const authorId = ctx.userId;
      // console.log('ctx', ctx.userId)

      console.log('input', JSON.stringify(input, null, 2))

      const programExercise = await ctx.prisma.exercise.update({
        where: { id: input.id, },
        data: { isComplete: input.isComplete, },
      })
      return programExercise
    }),

  updateSet: privateProcedure
    .input(z.object({
      id: z.string(),
      isComplete: z.boolean(),
      rpe: z.number(),
      weight: z.number(),
      estiamtedOnerm: z.number(),
      rep: z.number(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      // const authorId = ctx.userId;

      console.log('check',)
      console.log('input', JSON.stringify(input, null, 2))

      const programSet = await ctx.prisma.set.update({
        where: { id: input.id, },
        data: {
          isComplete: input.isComplete,
          rpe: input.rpe,
          weight: input.weight,
          estiamtedOnerm: input.estiamtedOnerm,
          rep: input.rep,
        },
      })

      return programSet
    }),
})
