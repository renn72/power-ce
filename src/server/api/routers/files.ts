import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'
import { utapi } from '~/server/uploadthing'
import { z } from 'zod'

export const filesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const files = await utapi.listFiles()
    return {
      files,
    }
  }),
  delete: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await utapi.deleteFiles(input.key)
      return {
        success: true,
      }
    }),
})
