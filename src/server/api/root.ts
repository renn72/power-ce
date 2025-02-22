import { createTRPCRouter } from '~/server/api/trpc'
import { blocksRouter } from '~/server/api/routers/blocks'
import { usersRouter } from '~/server/api/routers/users'
import { programsRouter } from './routers/programs'
import { userProgramsRouter } from './routers/userPrograms'
import { oneRepMaxRouter } from './routers/oneRepMax'
import { liftsRouter } from './routers/lifts'
import { liftRouter } from './routers/lift'
import { primaryLiftsRouter } from './routers/primaryLifts'
import { compLiftsRouter } from './routers/compLifts'
import { compDateRouter } from './routers/compDate'
import { daysRouter } from './routers/days'
import { setsRouter } from './routers/sets'
import { warmupsRouter } from './routers/warmup'
import { settingsRouter } from './routers/settings'
import { recordsRouter } from './routers/records'
import { compPlanRouter } from './routers/compPlan'
import { rpeRouter } from './routers/rpe'
import { adminLogRouter } from './routers/adminLog'
import { weekRouter } from './routers/week'
import { exerciseRouter } from './routers/exercise'
import { templateRouter } from './routers/template'
import { filesRouter } from './routers/files'
import { templateBuilderRouter } from './routers/templateBuilder'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const maxDuration = 20
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
    sets: setsRouter,
    warmups: warmupsRouter,
    settings: settingsRouter,
    records: recordsRouter,
    plans: compPlanRouter,
    rpe: rpeRouter,
    adminLog: adminLogRouter,
    weeks: weekRouter,
    exercise: exerciseRouter,
    template: templateRouter,
    files: filesRouter,
    templateBuilder: templateBuilderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
