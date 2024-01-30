import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetSumAggregateInputType> = z
  .object({
    rep: z.literal(true).optional(),
    rpe: z.literal(true).optional(),
    weight: z.literal(true).optional(),
    actualReps: z.literal(true).optional(),
    estiamtedOnerm: z.literal(true).optional(),
  })
  .strict()

export const SetSumAggregateInputObjectSchema = Schema
