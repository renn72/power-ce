import { clerkClient, } from '@clerk/nextjs/server'
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const primaryLiftsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx, }) => {
    const lifts = await ctx.prisma.primaryLifts.findMany({})

    return lifts
  }),

  create: privateProcedure
    .input(z.object({ name: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {

      const liftName = await ctx.prisma.primaryLifts.create({
        data: {
          name: input.name,
          creadedBy: ctx.userId,
        },
      })
      return liftName

    }),

  delete: privateProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({
      ctx, input,
    }) => {
      const lift = await ctx.prisma.primaryLifts.delete({ where: { id: input.id, }, })
      return lift
    }),
})
