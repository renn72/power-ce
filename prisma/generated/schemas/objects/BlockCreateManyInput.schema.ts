import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BlockCreateManyInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    creatorId: z.string().optional().nullable(),
    isGlobal: z.boolean().optional(),
    name: z.string(),
    isProgram: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    userId: z.string().optional().nullable(),
    trainerId: z.string().optional().nullable(),
    userIdOfProgram: z.string().optional().nullable(),
    isProgramActive: z.boolean().optional().nullable(),
    isComplete: z.boolean().optional().nullable(),
    isSecondary: z.boolean().optional().nullable(),
    flield1: z.string().optional().nullable(),
    flield2: z.string().optional().nullable(),
    flield3: z.string().optional().nullable(),
    flield4: z.string().optional().nullable(),
    flield5: z.string().optional().nullable(),
  })
  .strict()

export const BlockCreateManyInputObjectSchema = Schema
