import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.SuperSetMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    lift: z.lazy(() => SortOrderSchema).optional(),
    sets: z.lazy(() => SortOrderSchema).optional(),
    reps: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    trainerId: z.lazy(() => SortOrderSchema).optional(),
    isTemplate: z.lazy(() => SortOrderSchema).optional(),
    repUnit: z.lazy(() => SortOrderSchema).optional(),
    weightType: z.lazy(() => SortOrderSchema).optional(),
    onerm: z.lazy(() => SortOrderSchema).optional(),
    onermTop: z.lazy(() => SortOrderSchema).optional(),
    weightTop: z.lazy(() => SortOrderSchema).optional(),
    weightBottom: z.lazy(() => SortOrderSchema).optional(),
    targetRpe: z.lazy(() => SortOrderSchema).optional(),
    targetRpeHigh: z.lazy(() => SortOrderSchema).optional(),
    restTime: z.lazy(() => SortOrderSchema).optional(),
    restUnit: z.lazy(() => SortOrderSchema).optional(),
    setWieght: z.lazy(() => SortOrderSchema).optional(),
    setTopWeight: z.lazy(() => SortOrderSchema).optional(),
    isEstimatedOnerm: z.lazy(() => SortOrderSchema).optional(),
    estimatedOnermIndex: z.lazy(() => SortOrderSchema).optional(),
    actualSets: z.lazy(() => SortOrderSchema).optional(),
    actualReps: z.lazy(() => SortOrderSchema).optional(),
    isComplete: z.lazy(() => SortOrderSchema).optional(),
    rpe: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
    exerciseId: z.lazy(() => SortOrderSchema).optional(),
    notes: z.lazy(() => SortOrderSchema).optional(),
    htmlLink: z.lazy(() => SortOrderSchema).optional(),
    flield1: z.lazy(() => SortOrderSchema).optional(),
    flield2: z.lazy(() => SortOrderSchema).optional(),
    flield3: z.lazy(() => SortOrderSchema).optional(),
    flield4: z.lazy(() => SortOrderSchema).optional(),
    flield5: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SuperSetMaxOrderByAggregateInputObjectSchema = Schema
