import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    rep: z.literal(true).optional(),
    rpe: z.literal(true).optional(),
    weight: z.literal(true).optional(),
    isComplete: z.literal(true).optional(),
    name: z.literal(true).optional(),
    lift: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    trainerId: z.literal(true).optional(),
    actualReps: z.literal(true).optional(),
    estiamtedOnerm: z.literal(true).optional(),
    exerciseId: z.literal(true).optional(),
    flield1: z.literal(true).optional(),
    flield2: z.literal(true).optional(),
    flield3: z.literal(true).optional(),
    flield4: z.literal(true).optional(),
    flield5: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const SetCountAggregateInputObjectSchema = Schema
