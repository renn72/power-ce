import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

import { weekSchema } from '~/server/api/schemas/schemas'

export const weekRouter = createTRPCRouter({
  getAllTemplates: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const weeks = await ctx.prisma.week.findMany({
        orderBy: { createdAt: 'desc' },
        where: { isTemplate: true, trainerId: input?.userId },
        include: { day: { include: { exercise: { include: { ss: true } } } } },
      })
      return weeks
    }),

  create: privateProcedure
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
              warmupTemplateId: day.warmupTemplateId,
              exercise: {
                create: day.exercise.map((exercise) => ({
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
                  tempoDown: exercise.tempoDown,
                  tempoPause: exercise.tempoPause,
                  tempoUp: exercise.tempoUp,
                  isEstimatedOnerm: exercise.isEstimatedOnerm,
                  actualSets: exercise.sets,
                  estimatedOnermIndex: exercise.estimatedOnermIndex,
                  weightType: exercise.weightType,
                  repUnit: exercise.repUnit,
                  htmlLink: exercise.htmlLink,
                  ss: exercise.isSS
                    ? {
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
                          notes: s.notes,
                          htmlLink: s.htmlLink,
                        })),
                      }
                    : undefined,
                })),
              },
            })),
          },
        },
      })

      return week
    }),
  update: privateProcedure
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
                warmupTemplateId: day.warmupTemplateId,
                exercise: {
                  create: day.exercise.map((exercise) => ({
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
                    tempoDown: exercise.tempoDown,
                    tempoPause: exercise.tempoPause,
                    tempoUp: exercise.tempoUp,
                    isEstimatedOnerm: exercise.isEstimatedOnerm,
                    actualSets: exercise.sets,
                    estimatedOnermIndex: exercise.estimatedOnermIndex,
                    weightType: exercise.weightType,
                    repUnit: exercise.repUnit,
                    htmlLink: exercise.htmlLink,
                    ss: exercise.isSS
                      ? {
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
                            notes: s.notes,
                            htmlLink: s.htmlLink,
                          })),
                        }
                      : undefined,
                  })),
                },
              })),
            },
          },
        }),
      ])

      return updateAction
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const week = await ctx.prisma.week.delete({ where: { id: input.id } })
      return week
    }),
})
