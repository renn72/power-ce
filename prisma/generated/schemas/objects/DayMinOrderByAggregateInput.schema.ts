import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DayMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    trainerId: z.lazy(() => SortOrderSchema).optional(),
    isTemplate: z.lazy(() => SortOrderSchema).optional(),
    isRestDay: z.lazy(() => SortOrderSchema).optional(),
    weekId: z.lazy(() => SortOrderSchema).optional(),
    warmupTemplateId: z.lazy(() => SortOrderSchema).optional(),
    energyRating: z.lazy(() => SortOrderSchema).optional(),
    isComplete: z.lazy(() => SortOrderSchema).optional(),
    flield1: z.lazy(() => SortOrderSchema).optional(),
    flield2: z.lazy(() => SortOrderSchema).optional(),
    flield3: z.lazy(() => SortOrderSchema).optional(),
    flield4: z.lazy(() => SortOrderSchema).optional(),
    flield5: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DayMinOrderByAggregateInputObjectSchema = Schema
