import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";

const programSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  templateId: z.string(),
  programId: z.string(),
})

export const userProgramsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany()
    return res
  }),
  create: privateProcedure
    .input(programSchema)
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;

      console.log('input', JSON.stringify(input, null, 2))

      const res = await ctx.prisma.userProgram.create({
        data: {
          userId: input.userId,
          templateId: input.templateId,
          programId: input.programId,
        },
      })

      return res
    }),
})
