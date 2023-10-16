import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const warmupsRouter = createTRPCRouter({
  get: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const warmup = await ctx.prisma.warmupTemplate.findUnique({
        where: { id },
        include: {
          warmups: true,
        },
      })

      return warmup
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const warmups = await ctx.prisma.warmupTemplate.findMany({
      include: {
        warmups: true,
      },
    })

    return warmups
  }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        warmups: z.array(
          z.object({
            name: z.string(),
            notes: z.string(),
            link: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId
      const warmupTemplate = await ctx.prisma.warmupTemplate.create({
        data: {
          name: input.name,
          creatorId: authorId,
          warmups: {
            create: input.warmups.map((warmup) => ({
              name: warmup.name,
              notes: warmup.notes,
              link: warmup.link,
            })),
          },
        },
      })

      return warmupTemplate
    }),
})
