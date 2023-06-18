import { createTRPCRouter } from "~/server/api/trpc";
import { blocksRouter } from "~/server/api/routers/blocks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blocks: blocksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
