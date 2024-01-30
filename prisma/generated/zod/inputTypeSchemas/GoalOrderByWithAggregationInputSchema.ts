import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { GoalCountOrderByAggregateInputSchema } from './GoalCountOrderByAggregateInputSchema';
import { GoalMaxOrderByAggregateInputSchema } from './GoalMaxOrderByAggregateInputSchema';
import { GoalMinOrderByAggregateInputSchema } from './GoalMinOrderByAggregateInputSchema';

export const GoalOrderByWithAggregationInputSchema: z.ZodType<Prisma.GoalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  goal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => GoalCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GoalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GoalMinOrderByAggregateInputSchema).optional()
}).strict();

export default GoalOrderByWithAggregationInputSchema;
