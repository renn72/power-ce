import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const setsRouter = createTRPCRouter({
  getAllUser: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.set.findMany({
        where: {
          userId: input.userId,
          isComplete: true,
          flield1: {
            not: null,
        }
        },
      })
      return res
    }),
            
  cleanSets: privateProcedure
    .mutation(async ({ ctx, input }) => {
      const programSet = await ctx.prisma.set.deleteMany({
        where: { isComplete: false },
      })

      return programSet
    }),

  createSet: privateProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        rpe: z.number(),
        weight: z.number(),
        estiamtedOnerm: z.number(),
        rep: z.number(),
        lift: z.string(),
        name: z.string(),
        trainerId: z.string(),
        setReps: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      console.log('check')
      console.log('input', JSON.stringify(input, null, 2))

      const programSet = await ctx.prisma.set.create({
        data: {
          exerciseId: input.exerciseId,
          isComplete: true,
          rpe: input.rpe,
          weight: input.weight,
          estiamtedOnerm: input.estiamtedOnerm,
          rep: input.rep,
          userId: userId,
          lift: input.lift,
          name: input.name,
          trainerId: input.trainerId,
          actualReps: input.setReps,
          

          flield1: Date.now().toString(),
        },
      })

      return programSet
    }),

  deleteSet: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;
      //

      console.log('input', JSON.stringify(input, null, 2))

      const programSet = await ctx.prisma.set.delete({
        where: { id: input.id },
      })

      return programSet
    }),


  updateSet: privateProcedure
    .input(
      z.object({
        id: z.string(),
        isComplete: z.boolean(),
        rpe: z.number(),
        weight: z.number(),
        estiamtedOnerm: z.number(),
        rep: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;

      console.log('check')
      console.log('input', JSON.stringify(input, null, 2))

      const programSet = await ctx.prisma.set.update({
        where: { id: input.id },
        data: {
          isComplete: input.isComplete,
          rpe: input.rpe,
          weight: input.weight,
          estiamtedOnerm: input.estiamtedOnerm,
          rep: input.rep,
          flield1: Date.now().toString(),
        },
      })

      return programSet
    }),
})
