import { createTRPCRouter } from "~/server/api/trpc";
import { blocksRouter } from "~/server/api/routers/blocks";
import { usersRouter } from "~/server/api/routers/users";
import { programsRouter } from "./routers/programs";
import { userProgramsRouter } from "./routers/userPrograms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blocks: blocksRouter,
  users: usersRouter,
  programs: programsRouter,
  userPrograms: userProgramsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
