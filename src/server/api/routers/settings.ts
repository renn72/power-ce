import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

const settingsSchema = z.object({
  userId: z.string(),
  DOB: z.date(),
  height: z.number(),
  weight: z.number(),
  targetWeight: z.number(),
  weightGoal: z.string(),
  activityLevelTraining: z.string(),
  activityLevelRest: z.string(),
  goals: z.object({
    goal1: z.string(),
  }),
  squatOneRepMax: z.number(),
  benchOneRepMax: z.number(),
  deadliftOneRepMax: z.number(),
})

export const settingsRouter = createTRPCRouter({
  get: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.findUnique({
        where: {
          userId: input.userId,
        },
      })
      return res
    }),

  updateHeight: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        height: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          height: input.height,
        },
        create: {
          userId: input.userId,
          height: input.height,
        },
      })
      return res
    }),

  updateWeight: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        weight: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          weight: input.weight,
        },
        create: {
          userId: input.userId,
          weight: input.weight,
        },
      })
      return res
    }),

  updateTargetWeight: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        targetWeight: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          targetWeight: input.targetWeight,
        },
        create: {
          userId: input.userId,
          targetWeight: input.targetWeight,
        },
      })
      return res
    }),

  updateWeightGoal: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        weightGoal: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          weightGoal: input.weightGoal,
        },
        create: {
          userId: input.userId,
          weightGoal: input.weightGoal,
        },
      })
      return res
    }),

  updateDOB: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        DOB: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          DOB: input.DOB,
        },
        create: {
          userId: input.userId,
          DOB: input.DOB,
        },
      })
      return res
    }),

  createUpdateSettings: privateProcedure
    .input(settingsSchema)
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          DOB: input.DOB,
          height: input.height,
          weight: input.weight,
          targetWeight: input.targetWeight,
          weightGoal: input.weightGoal,
          activityLevelTraining: input.activityLevelTraining,
          activityLevelRest: input.activityLevelRest,
          squatOneRepMax: input.squatOneRepMax,
          benchOneRepMax: input.benchOneRepMax,
          deadliftOneRepMax: input.deadliftOneRepMax,
        },
        create: {
          userId: input.userId,
          DOB: input.DOB,
          height: input.height,
          weight: input.weight,
          targetWeight: input.targetWeight,
          weightGoal: input.weightGoal,
          activityLevelTraining: input.activityLevelTraining,
          activityLevelRest: input.activityLevelRest,
          squatOneRepMax: input.squatOneRepMax,
          benchOneRepMax: input.benchOneRepMax,
          deadliftOneRepMax: input.deadliftOneRepMax,
        },
      })

      return settings
    }),
})
