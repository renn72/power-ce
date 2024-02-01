import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

import {
  BlockCreateInputSchema,
  WeekCreateInputSchema,
} from 'prisma/generated/zod'

import { z } from 'zod'

export const templateRouter = createTRPCRouter({
  create: privateProcedure
    .input(BlockCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const block = await ctx.prisma.block.create({ data: input })
      return block
    }),

  update: privateProcedure
    .input(BlockCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const updateAction = await ctx.prisma.$transaction([
        ctx.prisma.block.delete({ where: { id: input.id } }),
        ctx.prisma.block.create({
          data: input,
        }),
      ])

      return updateAction
    }),
  getAllTemplateTitles: privateProcedure
    .input(z.object({ userId: z.string(), isSuperAdmin: z.boolean() }))
    .query(async ({ ctx, input }) => {
      if (input.isSuperAdmin) {
        const blocks = await ctx.prisma.block.findMany({
          orderBy: { createdAt: 'desc' },
          where: {
            isDeleted: false,
            isProgram: false,
          },
        })
        return blocks
      } else {
        const blocks = await ctx.prisma.block.findMany({
          orderBy: { createdAt: 'desc' },
          where: {
            trainerId: input.userId,
            isDeleted: false,
            isProgram: false,
          },
        })
        return blocks
      }
    }),
  get: privateProcedure
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
                include: {
                  exercise: {
                    include: {
                      ss: true,
                      set: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      return block
    }),
  createWeek: privateProcedure
    .input(WeekCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const week = await ctx.prisma.week.create({
        data: input,
      })

      return week
    }),
})
