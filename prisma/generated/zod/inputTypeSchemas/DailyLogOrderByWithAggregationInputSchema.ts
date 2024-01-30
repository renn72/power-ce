import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { DailyLogCountOrderByAggregateInputSchema } from './DailyLogCountOrderByAggregateInputSchema';
import { DailyLogAvgOrderByAggregateInputSchema } from './DailyLogAvgOrderByAggregateInputSchema';
import { DailyLogMaxOrderByAggregateInputSchema } from './DailyLogMaxOrderByAggregateInputSchema';
import { DailyLogMinOrderByAggregateInputSchema } from './DailyLogMinOrderByAggregateInputSchema';
import { DailyLogSumOrderByAggregateInputSchema } from './DailyLogSumOrderByAggregateInputSchema';

export const DailyLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.DailyLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fat: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  carbs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  protein: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  calories: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  steps: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  motivation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sleepHrs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sleepQuality: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recovery: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  energy: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  restingHeartRate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  vo2Max: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DailyLogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DailyLogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DailyLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DailyLogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DailyLogSumOrderByAggregateInputSchema).optional()
}).strict();

export default DailyLogOrderByWithAggregationInputSchema;
