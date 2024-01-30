import { z } from 'zod'
import { ExerciseArgsObjectSchema } from './ExerciseArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetInclude> = z
  .object({
    exercise: z
      .union([z.boolean(), z.lazy(() => ExerciseArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const SuperSetIncludeObjectSchema = Schema
