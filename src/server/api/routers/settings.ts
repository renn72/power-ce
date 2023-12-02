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
      if (!res) {
        const pro = await ctx.prisma.userProfile.create({
          data: {
            userId: input.userId,
          },
        })
        return pro
      }
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

  updateFirstName: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        firstName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          firstName: input.firstName,
        },
      })
      return res
    }),

  updateCompLift: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        field: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.update({
        where: {
          userId: input.userId,
        },
        data: {
          [input.field]: input.value,
        },
      })
      return res
    }),

  updateLastName: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        lastName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          lastName: input.lastName,
        },
      })
      return res
    }),

  updateEmail: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          email: input.email,
        },
      })
      return res
    }),

  updateRole: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.string(),
        value: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          [input.role]: input.value,
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

  updateGender: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        gender: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          gender: input.gender,
        },
        create: {
          userId: input.userId,
          gender: input.gender,
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

  updateActivityLevelTraining: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        activityLevelTraining: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          activityLevelTraining: input.activityLevelTraining,
        },
        create: {
          userId: input.userId,
          activityLevelTraining: input.activityLevelTraining,
        },
      })
      return res
    }),

  updateActivityLevelRest: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        activityLevelRest: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          activityLevelRest: input.activityLevelRest,
        },
        create: {
          userId: input.userId,
          activityLevelRest: input.activityLevelRest,
        },
      })
      return res
    }),
  updateSquatOneRepMax: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        squatOneRepMax: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          squatOneRepMax: input.squatOneRepMax,
        },
        create: {
          userId: input.userId,
          squatOneRepMax: input.squatOneRepMax,
        },
      })
      return res
    }),
  updateBenchOneRepMax: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        benchOneRepMax: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          benchOneRepMax: input.benchOneRepMax,
        },
        create: {
          userId: input.userId,
          benchOneRepMax: input.benchOneRepMax,
        },
      })
      return res
    }),
  updateDeadliftOneRepMax: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        deadliftOneRepMax: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProfile.upsert({
        where: {
          userId: input.userId,
        },
        update: {
          deadliftOneRepMax: input.deadliftOneRepMax,
        },
        create: {
          userId: input.userId,
          deadliftOneRepMax: input.deadliftOneRepMax,
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
