import { z } from 'zod'
import { ExerciseWhereInputObjectSchema } from './ExerciseWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseListRelationFilter> = z
  .object({
    every: z.lazy(() => ExerciseWhereInputObjectSchema).optional(),
    some: z.lazy(() => ExerciseWhereInputObjectSchema).optional(),
    none: z.lazy(() => ExerciseWhereInputObjectSchema).optional(),
  })
  .strict()

export const ExerciseListRelationFilterObjectSchema = Schema
