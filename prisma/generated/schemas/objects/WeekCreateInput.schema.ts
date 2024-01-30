import { z } from 'zod'
import { DayCreateNestedManyWithoutWeekInputObjectSchema } from './DayCreateNestedManyWithoutWeekInput.schema'
import { BlockCreateNestedOneWithoutWeekInputObjectSchema } from './BlockCreateNestedOneWithoutWeekInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.WeekCreateInput> = z
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
    block: z
      .lazy(() => BlockCreateNestedOneWithoutWeekInputObjectSchema)
      .optional(),
  })
  .strict()

export const WeekCreateInputObjectSchema = Schema
