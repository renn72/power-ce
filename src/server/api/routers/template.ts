import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

import { BlockCreateInputSchema } from 'prisma/generated/zod'

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
})
