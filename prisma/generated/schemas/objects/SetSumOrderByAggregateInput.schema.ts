import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SetSumOrderByAggregateInput> = z
  .object({
    rep: z.lazy(() => SortOrderSchema).optional(),
    rpe: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
    actualReps: z.lazy(() => SortOrderSchema).optional(),
    estiamtedOnerm: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SetSumOrderByAggregateInputObjectSchema = Schema
