import { z } from 'zod'

import Papa from 'papaparse'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

type OpenPowerLift = {
  Age: string
  AgeClass: string
  Bench1Kg: string
  Bench2Kg: string
  Bench3Kg: string
  Bench4Kg: string
  Best3BenchKg: string
  Best3DeadliftKg: string
  Best3SquatKg: string
  BirthYearClass: string
  BodyweightKg: string
  Country: string
  Date: string
  Deadlift1Kg: string
  Deadlift2Kg: string
  Deadlift3Kg: string
  Deadlift4Kg: string
  Division: string
  Dots: string
  Equipment: string
  Event: string
  Federation: string
  Glossbrenner: string
  Goodlift: string
  MeetCountry: string
  MeetName: string
  MeetState: string
  MeetTown: string
  Name: string
  ParentFederation: string
  Place: string
  Sex: string
  Squat1Kg: string
  Squat2Kg: string
  Squat3Kg: string
  Squat4Kg: string
  State: string
  Tested: string
  TotalKg: string
  WeightClassKg: string
  Wilks: string
}

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
        'https://www.openpowerlifting.org/api/liftercsv/samdufty',
      )
      const data = await res.text()
      return Papa.parse(data, {
        download: false,
        header: true,
        delimiter: ',',
        complete: function (results) {
          console.log('json', results.data[0])
          return results.data
        },
      })
    }),
  getCompLifts: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const cl = await ctx.prisma.compLift.findMany({
        orderBy: {
          Date: 'desc',
        },
        where: {
          userId: input.userId,
        },
      })
      return cl
    }),

  setOpenPower: privateProcedure
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
        'https://www.openpowerlifting.org/api/liftercsv/samdufty',
      )
      const data = await res.text()
      console.log('data', data)
      console.log('res', res)
      // return data
      const json = Papa.parse(data, {
        download: false,
        header: true,
        delimiter: ',',
      }).data as OpenPowerLift[]

      const compLifts = await ctx.prisma.compLift.findMany({
        where: {
          userId: input.userId,
        },
      })

      json.forEach(async (e) => {
        const { MeetName, Date } = e
        if (compLifts.find((c) => c.MeetName === MeetName && c.Date === Date)) {
          return
        }
        await ctx.prisma.compLift.create({
          data: {
            userId: input.userId,
            name: e.Name,
            Age: e.Age,
            AgeClass: e.AgeClass,
            BirthYearClass: e.BirthYearClass,
            Division: e.Division,
            Event: e.Event,
            BodyweightKg: e.BodyweightKg,
            WeightClass: e.WeightClassKg,
            Squat1: e.Squat1Kg,
            Squat2: e.Squat2Kg,
            Squat3: e.Squat3Kg,
            Squat4: e.Squat4Kg,
            Bench1: e.Bench1Kg,
            Bench2: e.Bench2Kg,
            Bench3: e.Bench3Kg,
            Bench4: e.Bench4Kg,
            Deadlift1: e.Deadlift1Kg,
            Deadlift2: e.Deadlift2Kg,
            Deadlift3: e.Deadlift3Kg,
            Deadlift4: e.Deadlift4Kg,
            Total: e.TotalKg,
            Place: e.Place,
            Dots: e.Dots,
            Wilks: e.Wilks,
            Glossbrenner: e.Glossbrenner,
            GoodLift: e.Goodlift,
            Federation: e.Federation,
            Date: e.Date,
            MeetName: e.MeetName,
            MeetCountry: e.MeetCountry,
            MeetState: e.MeetState,
            MeetTown: e.MeetTown,
          },
        })
      })

      return json
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
