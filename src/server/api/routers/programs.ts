import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const programsRouter = createTRPCRouter({
  updateDayEnergy: privateProcedure
    .input(
      z.object({
        id: z.string(),
        energyRating: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const programDay = await ctx.prisma.day.update({
        where: { id: input.id },
        data: {
          energyRating: input.energyRating,
          flield1: Date.now().toString(),
        },
      })

      return programDay
    }),
  completeExercise: privateProcedure
    .input(
      z.object({
        id: z.string(),
        isComplete: z.boolean(),
        notes: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;
      // console.log('ctx', ctx.userId)

      console.log('input', JSON.stringify(input, null, 2))

      const programExercise = await ctx.prisma.exercise.update({
        where: { id: input.id },
        data: {
          isComplete: input.isComplete,
          flield1: Date.now().toString(),
          flield2: input.notes,
        },
      })
      return programExercise
    }),
  deleteExercise: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;
      // console.log('ctx', ctx.userId)

      console.log('input', JSON.stringify(input, null, 2))

      const programExercise = await ctx.prisma.exercise.delete({
        where: { id: input.id },
      })
      return programExercise
    }),

  completeDay: privateProcedure
    .input(
      z.object({
        id: z.string(),
        isComplete: z.boolean(),
        programId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;
      // console.log('ctx', ctx.userId)

      console.log('input', JSON.stringify(input, null, 2))

      const programDay = await ctx.prisma.day.update({
        where: { id: input.id },
        data: { isComplete: input.isComplete, flield1: Date.now().toString() },
      })

      const program = await ctx.prisma.block.findUnique({
        where: { id: input.programId },
        include: {
          week: {
            include: {
              day: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      })

      if (!program) return programDay

      const days = program.week
        .map((week) =>
          week.day.map((day) => (day.isComplete || day.isRestDay ? 0 : 1)),
        )
        .flat()

      const total = days.reduce((a, b) => a + b, 0)

      if (total === 0) {
        await ctx.prisma.block.update({
          where: { id: input.programId },
          data: { isComplete: true, isProgramActive: false },
        })
        const newProgram = await ctx.prisma.block.updateMany({
          where: { userId: ctx.userId, isSecondary: true },
          data: { isProgramActive: true, isSecondary: false },
        })
      }

      console.log('days', days)
      console.log('total', total)

      return programDay
    }),

  cleanSets: privateProcedure.mutation(async ({ ctx }) => {
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
      const userId = ctx.userId

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
