import { z } from 'zod'
import { ExerciseWhereInputObjectSchema } from './ExerciseWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseRelationFilter> = z
  .object({
    is: z
      .lazy(() => ExerciseWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ExerciseWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const ExerciseRelationFilterObjectSchema = Schema
