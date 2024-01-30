import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetAvgAggregateInputType> = z
  .object({
    sets: z.literal(true).optional(),
    reps: z.literal(true).optional(),
    onerm: z.literal(true).optional(),
    onermTop: z.literal(true).optional(),
    weightTop: z.literal(true).optional(),
    weightBottom: z.literal(true).optional(),
    targetRpe: z.literal(true).optional(),
    targetRpeHigh: z.literal(true).optional(),
    restTime: z.literal(true).optional(),
    setWieght: z.literal(true).optional(),
    setTopWeight: z.literal(true).optional(),
    estimatedOnermIndex: z.literal(true).optional(),
    actualSets: z.literal(true).optional(),
    actualReps: z.literal(true).optional(),
    rpe: z.literal(true).optional(),
    weight: z.literal(true).optional(),
  })
  .strict()

export const SuperSetAvgAggregateInputObjectSchema = Schema
