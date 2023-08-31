
import { TRPCError, } from '@trpc/server'
import { z, } from 'zod'

import Papa from 'papaparse'

import {
  createTRPCRouter,
  privateProcedure,
} from '~/server/api/trpc'

export const compLiftsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx, }) => {
    const res = await ctx.prisma.compLift.findMany({})
    return res
  }),
  getCsv: privateProcedure.mutation(async ({ ctx, }) => {

    const res = await fetch('https://www.openpowerlifting.org/api/liftercsv/mitchlee1')
    const data = await res.text()
    console.log('data', data)
    console.log('res', res)
    return Papa.parse(data, {
      download: false,
      header: true,
      delimiter: ',',
      complete: function(results) {
        console.log(results);
        return results.data
      }
    })

    // const url = 'https://www.openpowerlifting.org/api/liftercsv/mitchlee1'
    // Papa.parse(url, {
    //   download: false,
    //   header: true,
    //   delimiter: ',',
    //   complete: function(results) {
    //     console.log(results);
    //     return results.data
    //   } 
    // })
  }),
})
