import { z } from 'zod'
import { WeekCreateNestedOneWithoutDayInputObjectSchema } from './WeekCreateNestedOneWithoutDayInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayCreateWithoutExerciseInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    name: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
    trainerId: z.string().optional().nullable(),
    isTemplate: z.boolean().optional().nullable(),
    isRestDay: z.boolean(),
    warmupTemplateId: z.string().optional().nullable(),
    energyRating: z.string().optional().nullable(),
    isComplete: z.boolean().optional().nullable(),
    flield1: z.string().optional().nullable(),
    flield2: z.string().optional().nullable(),
    flield3: z.string().optional().nullable(),
    flield4: z.string().optional().nullable(),
    flield5: z.string().optional().nullable(),
    week: z
      .lazy(() => WeekCreateNestedOneWithoutDayInputObjectSchema)
      .optional(),
  })
  .strict()

export const DayCreateWithoutExerciseInputObjectSchema = Schema
