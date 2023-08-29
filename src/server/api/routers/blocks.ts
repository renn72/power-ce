import { clerkClient, } from '@clerk/nextjs/server'
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

import type {
  Block, Post, Exercise, Day, Week,
} from '@prisma/client'

import { filterUserForClient, } from '~/server/helpers/filterUserForClient'

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
  getAll: publicProcedure.query(async ({ ctx, }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc', },
      where: {
        isProgram: false, isDeleted: false,
      },
      include: { week: { include: { day: { include: { exercise: true, }, }, }, }, },
    })
    return blocks
  }),
  getAllPrograms: publicProcedure.query(async ({ ctx, }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc', },
      where: {
        isProgram: true, isDeleted: false,
      },
      include: { week: { include: { day: { include: { exercise: { include: { set: true, }, }, }, }, }, }, },
    })
    return blocks
  }),
  getAllAdmin: publicProcedure.query(async ({ ctx, }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc', },
      include: { week: { include: { day: { include: { exercise: { include: { set: true, }, }, }, }, }, }, },
    })
    return blocks
  }),
  getAllUserPrograms: publicProcedure.query(async ({ ctx, }) => {
    const userId = ctx.userId
    const blocks = await ctx.prisma.block.findMany({
      orderBy: { createdAt: 'desc', },
      where: { userIdOfProgram: userId, },
      include: { week: { include: { day: { include: { exercise: { include: { set: true, }, }, }, }, }, }, },
    })
    return blocks
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query(async ({
      ctx, input,
    }) => {
      const block = await ctx.prisma.block.findUnique({
        where: { id: input.id, },
        include: { week: { include: { day: { include: { exercise: true, }, }, }, }, },
      })
      return block
    }),

  create: privateProcedure
    .input(blockSchema)
    .mutation(async ({
      ctx, input,
    }) => {
      // const authorId = ctx.userId;

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const block = await ctx.prisma.block.create({
        data: {
          name: input.name,
          isProgram: input.isProgram,
          week: {
            create: input.week.map((week) => ({
              name: week.name,
              isTemplate: week.isTemplate,
              day: {
                create: week.day.map((day) => ({
                  isRestDay: day.isRestDay,
                  exercise:
                  {
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

  getAllWeekTemplates: publicProcedure.query(async ({ ctx, }) => {
    const weeks = await ctx.prisma.week.findMany({
      orderBy: { createdAt: 'desc', },
      where: { isTemplate: true, },
      include: { day: { include: { exercise: true, }, }, },
    })
    return weeks
  }),

  createWeek: privateProcedure
    .input(weekSchema)
    .mutation(async ({
      ctx, input,
    }) => {
      const week = await ctx.prisma.week.create({
        data: {
          name: input.name,
          isTemplate: input.isTemplate,
          day: {
            create: input.day.map((day) => ({
              isRestDay: day.isRestDay,
              exercise:
              {
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

  update: privateProcedure
    .input(blockSchema)
    .mutation(async ({
      ctx, input,
    }) => {
      // const authorId = ctx.userId;

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const updateAction = await ctx.prisma.$transaction([
        ctx.prisma.block.delete({ where: { id: input.id, }, }),
        ctx.prisma.block.create({
          data: {
            name: input.name,
            isProgram: false,
            week: {
              create: input.week.map((week) => ({
                day: {
                  create: week.day.map((day) => ({
                    isRestDay: day.isRestDay,
                    exercise:
                    {
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

      // const deleteExercise = await ctx.prisma.exercise.deleteMany({ where: { id: { in: exercise_array, }, }, })
      //
      // const day_array = oldBlock?.week.map((week) => week.day.map((day) => day.id)).flat(1)
      // const deleteDay = await ctx.prisma.day.deleteMany({ where: { id: { in: day_array, }, }, })
      //
      // const week_array = oldBlock?.week.map((week) => week.id)
      // const deleteWeek = await ctx.prisma.week.deleteMany({ where: { id: { in: week_array, }, }, })
      //
      // const deleteBlock = await ctx.prisma.block.delete({ where: { id: oldBlock?.id, }, })
      //
      // const block = await ctx.prisma.block.create({
      //   data: {
      //     name: input.name,
      //     isProgram: false,
      //     week: {
      //       create: input.week.map((week) => ({
      //         day: {
      //           create: week.day.map((day) => ({
      //             isRestDay: day.isRestDay,
      //             exercise: {
      //               create: day.exercise.map((exercise) => ({
      //                 name: exercise.name,
      //                 lift: exercise.lift,
      //                 sets: exercise.sets,
      //                 reps: exercise.reps,
      //                 onerm: exercise.onerm,
      //                 onermTop: exercise.onermTop,
      //                 weightTop: exercise.weightTop,
      //                 weightBottom: exercise.weightBottom,
      //                 targetRpe: exercise.targetRpe,
      //                 notes: exercise?.notes,
      //                 isEstimatedOnerm: exercise.isEstimatedOnerm,
      //                 actualSets: exercise.sets,
      //                 estimatedOnermIndex: exercise.estimatedOnermIndex,
      //                 weightType: exercise.weightType,
      //                 repUnit: exercise.repUnit,
      //               })),
      //             },
      //           })),
      //         },
      //       })),
      //     },
      //   },
      // })
      //
      // console.log('block', JSON.stringify(block, null, 2))

      return updateAction

    }),
  hardDelete: privateProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {
      const block = await ctx.prisma.block.delete({ where: { id: input.id, }, })
      return block
    }),
  softDelete: privateProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {
      const block = await ctx.prisma.block.update({
        where: { id: input.id, }, data: { isDeleted: true, },
      })
      return block
    }),
  softUnDelete: privateProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {
      const block = await ctx.prisma.block.update({
        where: { id: input.id, }, data: { isDeleted: false, },
      })
      return block
    }),

})
