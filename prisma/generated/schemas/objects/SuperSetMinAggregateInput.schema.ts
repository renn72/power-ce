import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    lift: z.literal(true).optional(),
    sets: z.literal(true).optional(),
    reps: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    trainerId: z.literal(true).optional(),
    isTemplate: z.literal(true).optional(),
    repUnit: z.literal(true).optional(),
    weightType: z.literal(true).optional(),
    onerm: z.literal(true).optional(),
    onermTop: z.literal(true).optional(),
    weightTop: z.literal(true).optional(),
    weightBottom: z.literal(true).optional(),
    targetRpe: z.literal(true).optional(),
    targetRpeHigh: z.literal(true).optional(),
    restTime: z.literal(true).optional(),
    restUnit: z.literal(true).optional(),
    setWieght: z.literal(true).optional(),
    setTopWeight: z.literal(true).optional(),
    isEstimatedOnerm: z.literal(true).optional(),
    estimatedOnermIndex: z.literal(true).optional(),
    actualSets: z.literal(true).optional(),
    actualReps: z.literal(true).optional(),
    isComplete: z.literal(true).optional(),
    rpe: z.literal(true).optional(),
    weight: z.literal(true).optional(),
    exerciseId: z.literal(true).optional(),
    notes: z.literal(true).optional(),
    htmlLink: z.literal(true).optional(),
    flield1: z.literal(true).optional(),
    flield2: z.literal(true).optional(),
    flield3: z.literal(true).optional(),
    flield4: z.literal(true).optional(),
    flield5: z.literal(true).optional(),
  })
  .strict()

export const SuperSetMinAggregateInputObjectSchema = Schema
