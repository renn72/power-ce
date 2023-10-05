import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

import { getRandomInt } from '~/utils/utils'

const ssSchema = z.object({
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
  weightType: z.string().min(0).max(280).optional().nullable(),
  repUnit: z.string().min(0).max(55).optional().nullable(),
})

const exerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(0).max(280),
  lift: z.string().min(0).max(55).optional().nullable(),
  sets: z.number().min(0).max(99999).optional().nullable(),
  reps: z.number().min(0).max(99999).optional().nullable(),
  onerm: z.number().min(0).max(99999).optional().nullable(),
  onermTop: z.number().min(0).max(99999).optional().nullable(),
  weightTop: z.number().min(0).max(99999).optional().nullable(),
  weightBottom: z.number().min(0).max(99999).optional().nullable(),
  targetRpe: z.number().min(0).max(100).optional().nullable(),
  notes: z.string().min(0).max(280).optional().nullable(),
  isEstimatedOnerm: z.boolean().optional(),
  estimatedOnermIndex: z.number().min(0).max(100).optional().nullable(),
  weightType: z.string().min(0).max(280).optional().nullable(),
  repUnit: z.string().min(0).max(55).optional().nullable(),
  htmlLink: z.string().min(0).max(280).optional().nullable(),
  userId: z.string().optional(),
  isSS: z.boolean(),
  ss: z.array(ssSchema).optional().nullable(),
})

const programSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  templateId: z.string(),
  programId: z.string().optional(),
  isProgramActive: z.boolean(),
})

export const userProgramsRouter = createTRPCRouter({
  getAllUser: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId
    const res = await ctx.prisma.userProgram.findMany({
      where: {
        userId: userId,
        isDeleted: false,
      },
    })
    return res
  }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany({})
    return res
  }),
  getAllActive: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany({
      where: { isProgramActive: true },
    })
    return res
  }),
  create: privateProcedure
    .input(programSchema)
    .mutation(async ({ ctx, input }) => {
      console.log('start')

      const block = await ctx.prisma.block.findUnique({
        where: { id: input.templateId },
        include: {
          week: {
            include: {
              day: { include: { exercise: { include: { ss: true } } } },
            },
          },
        },
      })

      if (!block) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Block not found',
        })
      }

      console.log('found block')

      const program = await ctx.prisma.block.create({
        data: {
          name: block.name,
          isProgram: true,
          userIdOfProgram: input.userId,
          isProgramActive: true,
          trainerId: block.trainerId,
          week: {
            create: block.week.map((week) => ({
              day: {
                create: week.day.map((day) => ({
                  isRestDay: day.isRestDay,
                  exercise: {
                    create: day.exercise.map((exercise) => ({
                      name: exercise.name,
                      lift: exercise.lift,
                      sets: exercise.sets,
                      reps: exercise.reps,
                      onerm: exercise.onerm,
                      onermTop: exercise?.onermTop,
                      weightTop: exercise.weightTop,
                      weightBottom: exercise.weightBottom,
                      targetRpe: exercise.targetRpe,
                      estimatedOnermIndex: exercise.estimatedOnermIndex,
                      weightType: exercise.weightType,
                      notes: exercise?.notes,
                      isEstimatedOnerm: exercise?.isEstimatedOnerm,
                      isComplete: false,
                      actualSets: exercise.sets,
                      repUnit: exercise.repUnit,
                      htmlLink: exercise.htmlLink,
                      userId: input.userId,
                      ss: {
                        create: exercise?.ss?.map((s) => ({
                          name: s.name,
                          lift: s.lift,
                          reps: s.reps,
                          onerm: s.onerm,
                          onermTop: s.onermTop,
                          weightTop: s.weightTop,
                          weightBottom: s.weightBottom,
                          targetRpe: s.targetRpe,
                          weightType: s.weightType,
                          userId: input.userId,
                        })),
                      },
                    })),
                  },
                })),
              },
            })),
          },
        },
      })
      console.log('created program')

      const userProgram = ctx.prisma.userProgram.create({
        data: {
          userId: input.userId,
          templateId: input.templateId,
          programId: program.id,
          isProgramActive: true,
        },
      })

      const resUpdate = ctx.prisma.userProgram.updateMany({
        where: {
          NOT: { programId: program.id },
          userId: input.userId,
          isProgramActive: true,
        },
        data: { isProgramActive: false },
      })

      const proUpdate = ctx.prisma.block.updateMany({
        where: {
          NOT: { id: program.id },
          userIdOfProgram: input.userId,
          isProgramActive: true,
        },
        data: { isProgramActive: false },
      })

      await ctx.prisma.$transaction([userProgram, resUpdate, proUpdate])

      return program
    }),
  remove: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProgram.updateMany({
        where: {
          userId: input.userId,
          isProgramActive: true,
        },
        data: { isProgramActive: false },
      })

      await ctx.prisma.block.updateMany({
        where: {
          userIdOfProgram: input.userId,
          isProgramActive: true,
        },
        data: { isProgramActive: false },
      })

      return res
    }),
  updateExercise: privateProcedure
    .input(z.object({ exercise: exerciseSchema }))
    .mutation(async ({ ctx, input }) => {
      const exercise = input.exercise
      const userId = exercise.userId || ''
      await ctx.prisma.set.deleteMany({ where: { exerciseId: exercise.id } })
      await ctx.prisma.superSet.deleteMany({ where: { exerciseId: exercise.id } })
      const res = await ctx.prisma.exercise.update({
        where: { id: exercise.id },
        data: {
          name: exercise.name,
          lift: exercise.lift,
          sets: exercise.sets,
          reps: exercise.reps,
          onerm: exercise.onerm,
          onermTop: exercise?.onermTop,
          weightTop: exercise.weightTop,
          weightBottom: exercise.weightBottom,
          targetRpe: exercise.targetRpe,
          estimatedOnermIndex: exercise.estimatedOnermIndex,
          weightType: exercise.weightType,
          notes: exercise.notes,
          isEstimatedOnerm: exercise.isEstimatedOnerm
            ? exercise.isEstimatedOnerm
            : false,
          isComplete: false,
          actualSets: exercise.sets,
          repUnit: exercise.repUnit,
          htmlLink: exercise.htmlLink,
          userId: userId,
          ss: {
            create: exercise?.ss?.map((s) => ({
              name: s.name,
              lift: s.lift,
              reps: s.reps,
              onerm: s.onerm,
              onermTop: s.onermTop,
              weightTop: s.weightTop,
              weightBottom: s.weightBottom,
              targetRpe: s.targetRpe,
              weightType: s.weightType,
              userId: userId,
            })),
          },
          set: {
            create: Array.from(
              { length: exercise.sets ? +exercise.sets : 0 },
              (_) => ({
                rep: exercise.reps ? +exercise.reps : 1,
                isComplete: false,
                userId: userId,
                name: exercise.name,
                lift: exercise.lift,
              }),
            ),
          },
        },
      })

      return res
    }),
  deleteHard: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProgram.delete({
        where: { id: input.id },
      })

      return res
    }),
})
