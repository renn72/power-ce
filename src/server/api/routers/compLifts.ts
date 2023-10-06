import { z } from 'zod'

import Papa from 'papaparse'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

export const compLiftsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.compLift.findMany({})
    return res
  }),
  getOpenPower: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const address = await ctx.prisma.compLiftAddress.findUnique({
        where: {
          userId: input.userId,
        },
      })
      if (!address) {
        return 'no address'
      }
      console.log('address', address)
      const res = await fetch(
        'https://www.openpowerlifting.org/api/liftercsv/mitchlee1',
      )
      const data = await res.text()
      console.log('data', data)
      console.log('res', res)
      // return data
      return Papa.parse(data, {
        download: false,
        header: true,
        delimiter: ',',
        complete: function (results) {
          console.log(results)
          return results.data
        },
      })
    }),
  getAddress: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.compLiftAddress.findUnique({
        where: {
          userId: input.userId,
        },
      })
      return res
    }),
  createAddress: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, address } = input
      const res = await ctx.prisma.compLiftAddress.findFirst({
        where: {
          userId: userId,
        },
      })

      console.log('res', res)
      if (res) {
        const update = await ctx.prisma.compLiftAddress.update({
          where: {
            userId: userId,
          },
          data: {
            address: address,
          },
        })
        return update
      } else {
        const n = await ctx.prisma.compLiftAddress.create({
          data: {
            userId,
            address,
          },
        })
        return n
      }
    }),
})
