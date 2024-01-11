import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import absoluteUrl from 'next-absolute-url'

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
  logSignIn: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        location: z.string().optional(),
        url: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const req = ctx.req
      const id = input.userId
      const location = input.location || ''
      const url = input.url || ''

      const user = await ctx.prisma.user.findUnique({
        where: { id },
      })

      const res = await ctx.prisma.log.create({
        data: {
          location: location,
          action: 'signin',
          userId: id,
          url: url,
          response: JSON.stringify(user),
          request: JSON.stringify(req.headers),
        },
      })

      return res
    }),

  isUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        location: z.string().optional(),
        url: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const req = ctx.req
      let id = input.userId
      const location = input.location || ''
      const url = input.url
      const res = await ctx.prisma.user.findUnique({
        where: { id },
      })
      if (id === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') {
        id = 'david'
      }
      if (id === 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv') {
        id = 'mitch'
      }

      if (location === 'loading') {
        return false
      }

      await ctx.prisma.log.create({
        data: {
          location: location,
          action: 'is user',
          userId: id,
          url: url,
          response: JSON.stringify(res),
          request: JSON.stringify(req.headers),
        },
      })

      if (!res) {
        return false
      }
      return true
    }),
  get: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        location: z.string().optional(),
        url: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const req = ctx.req
      console.log(req.headers)
      let id = input.userId
      const location = input.location || 'nil'
      const res = await ctx.prisma.user.findUnique({
        where: { id },
      })

      if (id === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') {
        id = 'david'
      }
      if (id === 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv') {
        id = 'mitch'
      }

      await ctx.prisma.log.create({
        data: {
          location: location,
          action: 'get user',
          userId: id,
          url: req.headers.referer,
          response: JSON.stringify(res),
          request: JSON.stringify(req.headers),
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
