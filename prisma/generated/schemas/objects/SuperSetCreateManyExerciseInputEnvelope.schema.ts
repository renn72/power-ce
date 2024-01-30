import { z } from 'zod'
import { SuperSetCreateManyExerciseInputObjectSchema } from './SuperSetCreateManyExerciseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetCreateManyExerciseInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SuperSetCreateManyExerciseInputObjectSchema),
      z.lazy(() => SuperSetCreateManyExerciseInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const SuperSetCreateManyExerciseInputEnvelopeObjectSchema = Schema
