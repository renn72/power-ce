import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

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
  isUser: publicProcedure
    .input(z.object({ userId: z.string(), location: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const id = input.userId
      const res = await ctx.prisma.user.findUnique({
        where: { id },
      })

      if (!res) {
        return false
      }
      return true
    }),
  get: privateProcedure
    .input(z.object({ userId: z.string(), location: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      let id = input.userId
      const location = input.location || 'nil'
      const res = await ctx.prisma.user.findUnique({
        where: { id },
      })

      if (id === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') {
        id = 'me'
      }
      if (id === 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv') {
        id = 'me'
      }

      await ctx.prisma.log.create({
        data: {
          location: location,
          action: 'get user',
          userId: id,
          response: JSON.stringify(res),
        },
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
