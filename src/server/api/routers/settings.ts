import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

const settingsSchema = z.object({
  userId: z.string(),
  DOB: z.string(),
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
          },
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
