import { z } from 'zod'
import { ExerciseIncludeObjectSchema } from './ExerciseInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseArgs> = z
  .object({
    include: z.lazy(() => ExerciseIncludeObjectSchema).optional(),
  })
  .strict()

export const ExerciseArgsObjectSchema = Schema
