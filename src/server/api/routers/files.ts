import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'
import { utapi } from '~/server/uploadthing'

export const filesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const files = await utapi.listFiles()
    return {
      files,
    }
  }),
})
