import { z } from 'zod'
import { SetCreateManyExerciseInputObjectSchema } from './SetCreateManyExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetCreateManyExerciseInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SetCreateManyExerciseInputObjectSchema),
      z.lazy(() => SetCreateManyExerciseInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const SetCreateManyExerciseInputEnvelopeObjectSchema = Schema
