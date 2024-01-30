import { z } from 'zod'
import { DayCreateNestedManyWithoutWeekInputObjectSchema } from './DayCreateNestedManyWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateWithoutBlockInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    name: z.string().optional().nullable(),
    isTemplate: z.boolean().optional().nullable(),
    isDeleted: z.boolean().optional(),
    userId: z.string().optional().nullable(),
    trainerId: z.string().optional().nullable(),
    flield1: z.string().optional().nullable(),
    flield2: z.string().optional().nullable(),
    flield3: z.string().optional().nullable(),
    flield4: z.string().optional().nullable(),
    flield5: z.string().optional().nullable(),
    day: z
      .lazy(() => DayCreateNestedManyWithoutWeekInputObjectSchema)
      .optional(),
  })
  .strict()

export const WeekCreateWithoutBlockInputObjectSchema = Schema
