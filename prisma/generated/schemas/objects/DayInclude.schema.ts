import { z } from 'zod'
import { ExerciseFindManySchema } from '../findManyExercise.schema'
import { WeekArgsObjectSchema } from './WeekArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayInclude> = z
  .object({
    exercise: z
      .union([z.boolean(), z.lazy(() => ExerciseFindManySchema)])
      .optional(),
    week: z.union([z.boolean(), z.lazy(() => WeekArgsObjectSchema)]).optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const DayIncludeObjectSchema = Schema
