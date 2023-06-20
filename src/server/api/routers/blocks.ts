import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Block, Post, Exercise, Day, Week } from "@prisma/client";

import { filterUserForClient } from "~/server/helpers/filterUserForClient";

const exerciseSchema = z.object({
  name: z.string().min(1).max(280),
})
const daySchema = z.object({
  exercise: z.array(exerciseSchema),
})
const weekSchema = z.object({
  day: z.array(daySchema),
})
const blockSchema = z.object({
  name: z.string().min(1).max(280),
  week: z.array(weekSchema),
})

export const blocksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.prisma.block.findMany({
      orderBy: {
        createdAt: "asc",
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

    return blocks;
  }),


  create: privateProcedure
    .input(blockSchema)
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.userId;

      console.log('ctx', ctx.userId)
      console.log('input', JSON.stringify(input, null, 2))

      const block = await ctx.prisma.block.create({
        data: {
          name: input.name,
          week: {
            create: input.week.map((week) => ({
              day: {
                create: week.day.map((day) => ({
                  exercise: {
                    create: day.exercise.map((exercise) => ({
                      name: exercise.name,
                    })),
                  },
                })),
              },
            })),
          },
        },
      })

      return block
    }),
});
