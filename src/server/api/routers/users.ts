import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const usersRouter = createTRPCRouter({
  getSuperAdmin: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a',
      },
    })
    return user
  }),

  getAllUsers: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user.findMany({})
    return res
  }),
  getAllUsersProfiles: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.user.findMany({
      include: {
        userProfiles: true,
      },
    })
    return res
  }),
  get: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = input.userId
      const res = await ctx.prisma.user.findUnique({
        where: { id },
      })

      return res
    }),

  delete: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = input.userId
      const res = await ctx.prisma.user.delete({
        where: { id },
      })

      return res
    }),

  getTrainer: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.trainerToClient.findFirst({
        where: { clientId: input.userId },
      })

      return res
    }),

  setTrainer: privateProcedure
    .input(z.object({ userId: z.string(), trainerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.prisma.trainerToClient.findFirst({
        where: { clientId: input.userId },
      })

      if (client) {
        const ttc = await ctx.prisma.trainerToClient.update({
          where: { id: client.id },
          data: { trainerId: input.trainerId },
        })
        return ttc
      } else {
        const ttc = await ctx.prisma.trainerToClient.create({
          data: { clientId: input.userId, trainerId: input.trainerId },
        })
        return ttc
      }
    }),

  makeUsers: privateProcedure.mutation(async ({ ctx }) => {
    const res = await clerkClient.users.getUserList({
      orderBy: '-created_at',
      limit: 100,
    })

    const users = res.map((user) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
      }
    })

    const res2 = await ctx.prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    })

    return res
  }),

  deleteTrainer: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const client = await ctx.prisma.trainerToClient.findFirst({
        where: { clientId: input.userId },
      })

      if (client) {
        const ttc = await ctx.prisma.trainerToClient.delete({
          where: { id: client.id },
        })
        return ttc
      }
    }),

  getUserTemplate: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany()

    return res
  }),
})
