import { z } from 'zod'
import { SetFindManySchema } from '../findManySet.schema'
import { DayArgsObjectSchema } from './DayArgs.schema'
import { SuperSetFindManySchema } from '../findManySuperSet.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseInclude> = z
  .object({
    set: z.union([z.boolean(), z.lazy(() => SetFindManySchema)]).optional(),
    day: z.union([z.boolean(), z.lazy(() => DayArgsObjectSchema)]).optional(),
    ss: z.union([z.boolean(), z.lazy(() => SuperSetFindManySchema)]).optional(),
    _count: z.boolean().optional(),
  })
  .strict()

export const ExerciseIncludeObjectSchema = Schema
