import { z } from 'zod'

import {
    createTRPCRouter,
    privateProcedure,
    publicProcedure,
} from '~/server/api/trpc'

import { blockSchema, weekSchema } from '~/server/api/schemas/schemas'

import {
    BlockCreateInputObjectSchema,
    BlockCreateOneSchema,
} from '~/../prisma/generated/schemas'
import { BlockCreateInputSchema } from 'prisma/generated/zod'

export const blocksRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const authorId = ctx.userId
        const blocks = await ctx.prisma.block.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                isProgram: false,
                isDeleted: false,
                // trainerId: authorId,
            },
            include: {
                week: {
                    include: {
                        day: { include: { exercise: { include: { ss: true } } } },
                    },
                },
            },
        })
        return blocks
    }),
    getAllBlockTitlesAdmin: publicProcedure.query(async ({ ctx }) => {
        const blocks = await ctx.prisma.block.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                isProgram: false,
            },
        })
        return blocks
    }),
    getAllBlockTitles: publicProcedure.query(async ({ ctx }) => {
        const blocks = await ctx.prisma.block.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                isDeleted: false,
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
                        day: {
                            include: { exercise: { include: { set: true, ss: true } } },
                        },
                    },
                },
            },
        })
        return blocks
    }),
    getUserSets: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const userId = input.userId
        const sets = await ctx.prisma.set.findMany({
            where: {
                userId: userId,
            },
        })
        return sets
    }),
    getUserActiveSets: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const userId = input.userId
        const sets = await ctx.prisma.set.findMany({
            where: {
                userId: userId,
                isComplete: true,
            },
        })
        return sets
    }),
    getLogSets: privateProcedure.query(async ({ ctx }) => {
        const sets = await ctx.prisma.set.findMany({
            orderBy: { flield1: 'desc' },
            take: 200,
            where: {
                isComplete: true,
            },
        })
        return sets
    }),
    getAllAdmin: publicProcedure.query(async ({ ctx }) => {
        const blocks = await ctx.prisma.block.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                week: {
                    include: {
                        day: {
                            include: { exercise: { include: { set: true, ss: true } } },
                        },
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
                        day: {
                            include: { exercise: { include: { set: true, ss: true } } },
                        },
                    },
                },
            },
        })
        return block
    }),
    getExercise: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        const block = await ctx.prisma.exercise.findUnique({
            where: {
                id: input.id,
            },
            include: {
                ss: true,
                set: true,
            },
        })
        return block
    }),
    getUserActiveProgramFull: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const userId = input.userId
        const block = await ctx.prisma.block.findFirst({
            where: {
                userIdOfProgram: userId,
                isProgramActive: true,
                isDeleted: false,
            },
            include: {
                week: {
                    include: {
                        day: {
                            include: { exercise: { include: { set: true, ss: true } } },
                        },
                    },
                },
            },
        })
        return block
    }),
    getUserSecondaryProgram: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const userId = input.userId
        const block = await ctx.prisma.block.findFirst({
            where: {
                userIdOfProgram: userId,
                isSecondary: true,
                isDeleted: false,
            },
        })
        return block
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
                        day: {
                            include: { exercise: { include: { set: true, ss: true } } },
                        },
                    },
                },
            },
        })
        return blocks
    }),
    getAllUserProgramsTitles: publicProcedure
    .input(z.object({ userId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
        const userId = input?.userId
        const blocks = await ctx.prisma.block.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                userIdOfProgram: userId,
                isDeleted: false,
                OR: [
                    {
                        isSecondary: false,
                    },
                    {
                        isSecondary: null,
                    },
                ],
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
                week: {
                    include: {
                        day: { include: { exercise: { include: { ss: true } } } },
                    },
                },
            },
        })
        return block
    }),

    create: privateProcedure
    .input(blockSchema)
    .mutation(async ({ ctx, input }) => {
        const authorId = ctx.userId

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
                                        isEstimatedOnerm: exercise.isEstimatedOnerm,
                                        actualSets: exercise.sets,
                                        estimatedOnermIndex: exercise.estimatedOnermIndex,
                                        weightType: exercise.weightType,
                                        repUnit: exercise.repUnit,
                                        tempoDown: exercise.tempoDown,
                                        tempoPause: exercise.tempoPause,
                                        tempoUp: exercise.tempoUp,
                                        htmlLink: exercise.htmlLink,
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
                                                notes: s.notes,
                                                htmlLink: s.htmlLink,
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

        return block
    }),

    update: privateProcedure
    .input(blockSchema)
    .mutation(async ({ ctx, input }) => {
        const updateAction = await ctx.prisma.$transaction([
            ctx.prisma.block.delete({ where: { id: input.id || '' } }),
            ctx.prisma.block.create({
                data: {
                    name: input.name,
                    isProgram: false,
                    trainerId: ctx.userId,
                    week: {
                        create: input.week.map((week) => ({
                            day: {
                                create: week.day.map((day) => ({
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
                        })),
                    },
                },
            }),
        ])

        return updateAction
    }),

    getAllWeekTemplates: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
        const weeks = await ctx.prisma.week.findMany({
            orderBy: { createdAt: 'desc' },
            where: { isTemplate: true, trainerId: input?.userId },
            include: { day: { include: { exercise: { include: { ss: true } } } } },
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

    deleteWeek: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const week = await ctx.prisma.week.delete({ where: { id: input.id } })
        return week
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
