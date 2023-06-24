import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";

import { getRandomInt } from "~/utils/utils"

const programSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  templateId: z.string(),
  programId: z.string().optional(),
  isProgramActive: z.boolean(),
})

export const userProgramsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany({})
    return res
  }),
  getAllActive: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.userProgram.findMany({
      where: {
        isProgramActive: true,
      },
    })
    return res
  }),
  create: privateProcedure
    .input(programSchema)
    .mutation(async ({ ctx, input }) => {

      const userPrograms = await ctx.prisma.userProgram.findFirst({
        where: {
          userId: input.userId,
          isProgramActive: true,
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
          name: block.name + '-' + getRandomInt(99).toString(),
          isProgram: true,
          userIdOfProgram: input.userId,
          isProgramActive: true,
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


      const res = await ctx.prisma.userProgram.create({
        data: {
          userId: input.userId,
          templateId: input.templateId,
          programId: program.id,
          isProgramActive: true,
        },
      })
    
      if (userPrograms) {
        const res_update = await ctx.prisma.userProgram.update({
          where: {
            id: userPrograms.id,
          },
          data: {
            isProgramActive: false,
          },
        })
        return res
      }

      return res

    }),
  remove: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.userProgram.updateMany({
        where: {
          userId: input.userId,
          isProgramActive: true,
        },
        data: {
          isProgramActive: false,
        },
      })

      return res
    }),
})
