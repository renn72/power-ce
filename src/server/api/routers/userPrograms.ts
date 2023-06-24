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

      const block = await ctx.prisma.block.findUnique({
        where: {
          id: input.templateId,
        },
        include: {
          week: {
            include: {
              day: {
                include: {
                  exercise: true,
                },
              },
            },
          },
        },
      });

       
      if (!block) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Block not found",
        });
      }
      
      const program = await ctx.prisma.block.create({
        data: {
          name: block.name + '-p',
          isProgram: true,
          userIdOfProgram: input.userId,
          week: {
            create: block.week.map((week) => ({
              day: {
                create: week.day.map((day) => ({
                  isRestDay: day.isRestDay,
                  exercise: {
                    create: day.exercise.map((exercise) => ({
                      name: exercise.name,
                      lift: exercise.lift,
                      sets: exercise.sets,
                      reps: exercise.reps,
                      onerm: exercise.onerm,
                    })),
                  },
                })),
              },
            })),
          },
        },
      })

      console.log('program', JSON.stringify(program, null, 2))

      if (!program) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Program not found",
        });
      }

      if (userPrograms) {
        const res = await ctx.prisma.userProgram.update({
          where: {
            userId: input.userId,
          },
          data: {
            templateId: input.templateId,
            programId: program.id,
          },
        })
        return res
      } else {

        const res = await ctx.prisma.userProgram.create({
          data: {
            userId: input.userId,
            templateId: input.templateId,
            programId: program.id,
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
