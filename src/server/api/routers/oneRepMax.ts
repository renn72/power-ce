import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

export const oneRepMaxRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx, }) => {
    const onerm = await ctx.prisma.oneRepMax.findMany({})
    return onerm
  }),
  getUser: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query(async ({
      ctx, input,
    }) => {
      const onerm = await ctx.prisma.oneRepMax.findFirst({ where: { userId: input.id, }, })
      return onerm
    }),
  create: privateProcedure
    .input(z.object({
      weight: z.number(), userId: z.string(), lift: z.string(),
    }))
    .mutation(async ({
      ctx, input,
    }) => {
      const onerm = await ctx.prisma.oneRepMax.create({ data: input, })
      return onerm
    }),
})
