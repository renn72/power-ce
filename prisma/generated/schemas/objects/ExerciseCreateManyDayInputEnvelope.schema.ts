import { z } from 'zod'
import { ExerciseCreateManyDayInputObjectSchema } from './ExerciseCreateManyDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExerciseCreateManyDayInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ExerciseCreateManyDayInputObjectSchema),
      z.lazy(() => ExerciseCreateManyDayInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ExerciseCreateManyDayInputEnvelopeObjectSchema = Schema
