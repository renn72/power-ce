import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    isTemplate: z.literal(true).optional(),
    isDeleted: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    trainerId: z.literal(true).optional(),
    blockId: z.literal(true).optional(),
    flield1: z.literal(true).optional(),
    flield2: z.literal(true).optional(),
    flield3: z.literal(true).optional(),
    flield4: z.literal(true).optional(),
    flield5: z.literal(true).optional(),
  })
  .strict()

export const WeekMinAggregateInputObjectSchema = Schema
