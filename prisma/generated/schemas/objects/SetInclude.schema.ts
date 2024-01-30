import { z } from 'zod'
import { ExerciseArgsObjectSchema } from './ExerciseArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetInclude> = z
  .object({
    exercise: z
      .union([z.boolean(), z.lazy(() => ExerciseArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const SetIncludeObjectSchema = Schema
