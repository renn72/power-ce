import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    creatorId: z.literal(true).optional(),
    isGlobal: z.literal(true).optional(),
    name: z.literal(true).optional(),
    isProgram: z.literal(true).optional(),
    isDeleted: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    trainerId: z.literal(true).optional(),
    userIdOfProgram: z.literal(true).optional(),
    isProgramActive: z.literal(true).optional(),
    isComplete: z.literal(true).optional(),
    isSecondary: z.literal(true).optional(),
    flield1: z.literal(true).optional(),
    flield2: z.literal(true).optional(),
    flield3: z.literal(true).optional(),
    flield4: z.literal(true).optional(),
    flield5: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const BlockCountAggregateInputObjectSchema = Schema
