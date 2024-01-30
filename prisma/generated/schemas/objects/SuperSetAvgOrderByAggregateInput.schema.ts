import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetAvgOrderByAggregateInput> = z
  .object({
    sets: z.lazy(() => SortOrderSchema).optional(),
    reps: z.lazy(() => SortOrderSchema).optional(),
    onerm: z.lazy(() => SortOrderSchema).optional(),
    onermTop: z.lazy(() => SortOrderSchema).optional(),
    weightTop: z.lazy(() => SortOrderSchema).optional(),
    weightBottom: z.lazy(() => SortOrderSchema).optional(),
    targetRpe: z.lazy(() => SortOrderSchema).optional(),
    targetRpeHigh: z.lazy(() => SortOrderSchema).optional(),
    restTime: z.lazy(() => SortOrderSchema).optional(),
    setWieght: z.lazy(() => SortOrderSchema).optional(),
    setTopWeight: z.lazy(() => SortOrderSchema).optional(),
    estimatedOnermIndex: z.lazy(() => SortOrderSchema).optional(),
    actualSets: z.lazy(() => SortOrderSchema).optional(),
    actualReps: z.lazy(() => SortOrderSchema).optional(),
    rpe: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SuperSetAvgOrderByAggregateInputObjectSchema = Schema
