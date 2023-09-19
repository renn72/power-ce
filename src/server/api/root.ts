import { createTRPCRouter, } from '~/server/api/trpc'
import { blocksRouter, } from '~/server/api/routers/blocks'
import { usersRouter, } from '~/server/api/routers/users'
import { programsRouter, } from './routers/programs'
import { userProgramsRouter, } from './routers/userPrograms'
import { oneRepMaxRouter, } from './routers/oneRepMax'
import { liftsRouter, } from './routers/lifts'
import { liftRouter, } from './routers/lift'
import { primaryLiftsRouter, } from './routers/primaryLifts'
import { compLiftsRouter, } from './routers/compLifts'
import { compDateRouter, } from './routers/compDate'
import { daysRouter } from './routers/days'

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
  oneRepMax: oneRepMaxRouter,
  lifts: liftsRouter,
  lift: liftRouter,
  primaryLifts: primaryLiftsRouter,
  compLift: compLiftsRouter,
  compDate: compDateRouter,
  days: daysRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
