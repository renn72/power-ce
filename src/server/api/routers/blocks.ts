import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

import type { Block, Post, Exercise, Day, Week } from '@prisma/client'

import { filterUserForClient } from '~/server/helpers/filterUserForClient'

const exerciseSchema = z.object({
  name: z.string().min(0).max(280).optional().nullable(),
  lift: z.string().min(0).max(55).optional().nullable(),
  sets: z.number().min(0).max(55).optional().nullable(),
  reps: z.number().min(0).max(99999).optional().nullable(),
  onerm: z.number().min(0).max(99999).optional().nullable(),
  onermTop: z.number().min(0).max(99999).optional().nullable(),
  weightTop: z.number().min(0).max(99999).optional().nullable(),
  weightBottom: z.number().min(0).max(99999).optional().nullable(),
  targetRpe: z.number().min(0).max(100).optional().nullable(),
  notes: z.string().min(0).max(280).optional().nullable(),
  isEstimatedOnerm: z.boolean(),
  estimatedOnermIndex: z.number().min(0).max(100).optional().nullable(),
  weightType: z.string().min(0).max(280).optional().nullable(),
  repUnit: z.string().min(0).max(55).optional().nullable(),
  htmlLink: z.string().min(0).max(280).optional().nullable(),
})
const daySchema = z.object({
  isRestDay: z.boolean(),
  exercise: z.array(exerciseSchema),
})
const weekSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(0).max(280),
  isTemplate: z.boolean(),
  day: z.array(daySchema),
})
const blockSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(280),
  isProgram: z.boolean(),
  week: z.array(weekSchema),
})

export const blocksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isProgram: false,
        isDeleted: false,
      },
      include: { week: { include: { day: { include: { exercise: true } } } } },
    })
    return blocks
  }),
  getAllBlockTitles: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isProgram: false,
      },
    })
    return blocks
  }),
  getAllProgramTitles: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isProgram: true,
      },
    })
    return blocks
  }),
  getAllPrograms: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        isProgram: true,
        isDeleted: false,
      },
      include: {
        week: {
          include: {
            day: { include: { exercise: { include: { set: true } } } },
          },
        },
      },
    })
    return blocks
  }),
  getAllAdmin: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        week: {
          include: {
            day: { include: { exercise: { include: { set: true } } } },
          },
        },
      },
    })
    return blocks
  }),
  getUserActiveProgram: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = input.userId
      const block = await ctx.prisma.block.findFirst({
        orderBy: { createdAt: 'desc' },
        where: {
          userIdOfProgram: userId,
          isProgramActive: true,
          isDeleted: false,
        },
      })
      return block
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.findUnique({
        where: {
          id: input.id,
        },
        include: {
          week: {
            include: {
              day: { include: { exercise: { include: { set: true } } } },
            },
          },
        },
      })
      return block
    }),
  getUserActiveProgramFull: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = input.userId
      const blocks = await ctx.prisma.block.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          userIdOfProgram: userId,
          isProgramActive: true,
          isDeleted: false,
        },
        include: {
          week: {
            include: {
              day: { include: { exercise: { include: { set: true } } } },
            },
          },
        },
      })
      return blocks
    }),
  getAllUserPrograms: publicProcedure
    .input(z.object({ userId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const userId = input?.userId ? input.userId : ctx.userId
      const blocks = await ctx.prisma.block.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          userIdOfProgram: userId,
          isDeleted: false,
        },
        include: {
          week: {
            include: {
              day: { include: { exercise: { include: { set: true } } } },
            },
          },
        },
      })
      return blocks
    }),
  getAllUserProgramsTitles: publicProcedure
    .input(z.object({ userId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const userId = input?.userId ? input.userId : ctx.userId
      const blocks = await ctx.prisma.block.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          userIdOfProgram: userId,
          isDeleted: false,
        },
      })
      return blocks
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.findUnique({
        where: { id: input.id },
        include: {
          week: { include: { day: { include: { exercise: true } } } },
        },
      })
      return block
    }),

  create: privateProcedure
    .input(blockSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const block = await ctx.prisma.block.create({
        data: {
          name: input.name,
          isProgram: input.isProgram,
          trainerId: authorId,
          week: {
            create: input.week.map((week) => ({
              name: week.name,
              isTemplate: week.isTemplate,
              day: {
                create: week.day.map((day) => ({
                  isRestDay: day.isRestDay,
                  exercise: {
                    createMany: {
                      data: day.exercise.map((exercise) => ({
                        name: exercise.name,
                        lift: exercise.lift,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        onerm: exercise.onerm,
                        onermTop: exercise.onermTop,
                        weightTop: exercise.weightTop,
                        weightBottom: exercise.weightBottom,
                        targetRpe: exercise.targetRpe,
                        notes: exercise?.notes,
                        isEstimatedOnerm: exercise.isEstimatedOnerm,
                        actualSets: exercise.sets,
                        estimatedOnermIndex: exercise.estimatedOnermIndex,
                        weightType: exercise.weightType,
                        repUnit: exercise.repUnit,
                        htmlLink: exercise.htmlLink,
                      })),
                    },
                  },
                })),
              },
            })),
          },
        },
      })

      return block
    }),

  getAllWeekTemplates: publicProcedure.query(async ({ ctx }) => {
    const weeks = await ctx.prisma.week.findMany({
      orderBy: { createdAt: 'desc' },
      where: { isTemplate: true },
      include: { day: { include: { exercise: true } } },
    })
    return weeks
  }),

  createWeek: privateProcedure
    .input(weekSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId
      const week = await ctx.prisma.week.create({
        data: {
          name: input.name,
          isTemplate: input.isTemplate,
          trainerId: authorId,
          day: {
            create: input.day.map((day) => ({
              isRestDay: day.isRestDay,
              exercise: {
                createMany: {
                  data: day.exercise.map((exercise) => ({
                    name: exercise.name,
                    lift: exercise.lift,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    onerm: exercise.onerm,
                    onermTop: exercise.onermTop,
                    weightTop: exercise.weightTop,
                    weightBottom: exercise.weightBottom,
                    targetRpe: exercise.targetRpe,
                    notes: exercise?.notes,
                    isEstimatedOnerm: exercise.isEstimatedOnerm,
                    actualSets: exercise.sets,
                    estimatedOnermIndex: exercise.estimatedOnermIndex,
                    weightType: exercise.weightType,
                    repUnit: exercise.repUnit,
                    htmlLink: exercise.htmlLink,
                  })),
                },
              },
            })),
          },
        },
      })

      return week
    }),
  updateWeek: privateProcedure
    .input(weekSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId
      const updateAction = await ctx.prisma.$transaction([
        ctx.prisma.week.delete({ where: { id: input.id } }),
        ctx.prisma.week.create({
          data: {
            name: input.name,
            isTemplate: input.isTemplate,
            trainerId: authorId,
            day: {
              create: input.day.map((day) => ({
                isRestDay: day.isRestDay,
                exercise: {
                  createMany: {
                    data: day.exercise.map((exercise) => ({
                      name: exercise.name,
                      lift: exercise.lift,
                      sets: exercise.sets,
                      reps: exercise.reps,
                      onerm: exercise.onerm,
                      onermTop: exercise.onermTop,
                      weightTop: exercise.weightTop,
                      weightBottom: exercise.weightBottom,
                      targetRpe: exercise.targetRpe,
                      notes: exercise?.notes,
                      isEstimatedOnerm: exercise.isEstimatedOnerm,
                      actualSets: exercise.sets,
                      estimatedOnermIndex: exercise.estimatedOnermIndex,
                      weightType: exercise.weightType,
                      repUnit: exercise.repUnit,
                      htmlLink: exercise.htmlLink,
                    })),
                  },
                },
              })),
            },
          },
        }),
      ])

      return updateAction
    }),

  deleteWeek: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const week = await ctx.prisma.week.delete({ where: { id: input.id } })
      return week
    }),

  update: privateProcedure
    .input(blockSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const updateAction = await ctx.prisma.$transaction([
        ctx.prisma.block.delete({ where: { id: input.id } }),
        ctx.prisma.block.create({
          data: {
            name: input.name,
            isProgram: false,
            trainerId: authorId,
            week: {
              create: input.week.map((week) => ({
                day: {
                  create: week.day.map((day) => ({
                    isRestDay: day.isRestDay,
                    exercise: {
                      createMany: {
                        data: day.exercise.map((exercise) => ({
                          name: exercise.name,
                          lift: exercise.lift,
                          sets: exercise.sets,
                          reps: exercise.reps,
                          onerm: exercise.onerm,
                          onermTop: exercise.onermTop,
                          weightTop: exercise.weightTop,
                          weightBottom: exercise.weightBottom,
                          targetRpe: exercise.targetRpe,
                          notes: exercise?.notes,
                          isEstimatedOnerm: exercise.isEstimatedOnerm,
                          actualSets: exercise.sets,
                          estimatedOnermIndex: exercise.estimatedOnermIndex,
                          weightType: exercise.weightType,
                          repUnit: exercise.repUnit,
                          htmlLink: exercise.htmlLink,
                        })),
                      },
                    },
                  })),
                },
              })),
            },
          },
        }),
      ])

      return updateAction
    }),
  hardDelete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.delete({ where: { id: input.id } })
      return block
    }),
  softDelete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.update({
        where: { id: input.id },
        data: { isDeleted: true },
      })
      // console.log('block', block)
      if (block.isProgram) {
        await ctx.prisma.userProgram.updateMany({
          where: { programId: input.id },
          data: { isDeleted: true },
        })
      }
      return block
    }),
  softUnDelete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.update({
        where: { id: input.id },
        data: { isDeleted: false },
      })
      return block
    }),
})
