import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

import { exerciseSchema } from '~/server/api/schemas/schemas'

export const exerciseRouter = createTRPCRouter({
    getAll: privateProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const exercises = await ctx.prisma.exercise.findMany({
                orderBy: { createdAt: 'desc' },
                where: { isTemplate: true, trainerId: input?.userId },
                include: { ss: true },
            })
            const exercisesWithoutDayId = exercises.map((e) => {
                const { dayId, ...rest } = e
                return rest
            })
            return exercisesWithoutDayId
        }),

    getAllTempAndDay: privateProcedure.query(async ({ ctx, input }) => {
        const exercises = await ctx.prisma.exercise.findMany({
            orderBy: { createdAt: 'desc' },
            where: { isTemplate: true, },
        })
        return exercises
    }),

    updateAllTempAndDay: privateProcedure
        .mutation(async ({ ctx, }) => {
            const exercises = await ctx.prisma.exercise.updateMany({
                where: { isTemplate: true, dayId: { not: null } },
                data: {
                    isTemplate: false,
                },
            })
        }),

    create: privateProcedure
        .input(exerciseSchema)
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId
            console.log(authorId)
            const exercise = await ctx.prisma.exercise.create({
                data: {
                    isTemplate: true,
                    trainerId: authorId,
                    name: input.name,
                    lift: input.lift,
                    sets: input.sets,
                    reps: input.reps,
                    onerm: input.onerm,
                    onermTop: input.onermTop,
                    weightTop: input.weightTop,
                    weightBottom: input.weightBottom,
                    targetRpe: input.targetRpe,
                    targetRpeHigh: input.targetRpeHigh,
                    restTime: input.restTime,
                    restUnit: input.restUnit,
                    notes: input?.notes,
                    tempoDown: input.tempoDown,
                    tempoPause: input.tempoPause,
                    tempoUp: input.tempoUp,
                    isEstimatedOnerm: input.isEstimatedOnerm,
                    actualSets: input.sets,
                    estimatedOnermIndex: input.estimatedOnermIndex,
                    weightType: input.weightType,
                    repUnit: input.repUnit,
                    htmlLink: input.htmlLink,
                    ss: input.isSS
                        ? {
                              create: input?.ss?.map((s) => ({
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
                },
            })

            return exercise
        }),
    update: privateProcedure
        .input(exerciseSchema)
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId
            const updateAction = await ctx.prisma.$transaction([
                ctx.prisma.exercise.delete({ where: { id: input.id } }),
                ctx.prisma.exercise.create({
                    data: {
                        isTemplate: input.isTemplate,
                        trainerId: authorId,
                        name: input.name,
                        lift: input.lift,
                        sets: input.sets,
                        reps: input.reps,
                        onerm: input.onerm,
                        onermTop: input.onermTop,
                        weightTop: input.weightTop,
                        weightBottom: input.weightBottom,
                        targetRpe: input.targetRpe,
                        notes: input?.notes,
                        tempoDown: input.tempoDown,
                        tempoPause: input.tempoPause,
                        tempoUp: input.tempoUp,
                        isEstimatedOnerm: input.isEstimatedOnerm,
                        actualSets: input.sets,
                        estimatedOnermIndex: input.estimatedOnermIndex,
                        weightType: input.weightType,
                        repUnit: input.repUnit,
                        htmlLink: input.htmlLink,
                        ss: input.isSS
                            ? {
                                  create: input?.ss?.map((s) => ({
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
                    },
                }),
            ])

            return updateAction
        }),

    delete: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const exercise = await ctx.prisma.exercise.delete({
                where: { id: input.id },
            })
            return exercise
        }),
})
