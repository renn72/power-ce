import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

import { BlockCreateInputSchema } from 'prisma/generated/zod'

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

})
