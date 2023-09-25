import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc'

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const res = await clerkClient.users.getUserList()
    type Users = typeof res
    const users: { users: Users; admins: Users } = {
      users: [],
      admins: [],
    }
    users.users = res.filter(
      (user) =>
        user.emailAddresses.filter(
          (email) =>
            email.emailAddress !== 'ren@warner.systems' &&
            email.emailAddress !== 'mitchlee021@gmail.com',
        ).length > 0,
    )
    users.admins = res.filter(
      (user) =>
        user.emailAddresses.filter(
          (email) =>
            email.emailAddress === 'ren@warner.systems' ||
            email.emailAddress === 'mitchlee021@gmail.com',
        ).length > 0,
    )
    console.log(users)

    return users
  }),
  getAllUsers: publicProcedure.query(async () => {
    const res = await clerkClient.users.getUserList()

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
