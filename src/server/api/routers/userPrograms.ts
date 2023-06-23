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
  programId: z.string().optional(),
})

export const userProgramsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany()
    return res
  }),
  create: privateProcedure
    .input(programSchema)
    .mutation(async ({ ctx, input }) => {
      const userPrograms = await ctx.prisma.userProgram.findUnique({
        where: {
          userId: input.userId,
        }
      })

      if (userPrograms) {
        const res = await ctx.prisma.userProgram.update({
          where: {
            userId: input.userId,
          },
          data: {
            templateId: input.templateId,
            programId: input.programId,
          },
        })
        return res
      } else {

        const res = await ctx.prisma.userProgram.create({
          data: {
            userId: input.userId,
            templateId: input.templateId,
            programId: input.programId,
          },
        })
        return res
      }
    }),
  delete: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProgram.delete({
        where: {
          userId: input.userId,
        },
      })

      return res
    }),
})
