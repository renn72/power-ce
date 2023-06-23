import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { Block, Post, Exercise, Day, Week } from "@prisma/client";

export const programsRouter = createTRPCRouter({
  
})
