import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { OneRepMaxCountOrderByAggregateInputSchema } from './OneRepMaxCountOrderByAggregateInputSchema';
import { OneRepMaxAvgOrderByAggregateInputSchema } from './OneRepMaxAvgOrderByAggregateInputSchema';
import { OneRepMaxMaxOrderByAggregateInputSchema } from './OneRepMaxMaxOrderByAggregateInputSchema';
import { OneRepMaxMinOrderByAggregateInputSchema } from './OneRepMaxMinOrderByAggregateInputSchema';
import { OneRepMaxSumOrderByAggregateInputSchema } from './OneRepMaxSumOrderByAggregateInputSchema';

export const OneRepMaxOrderByWithAggregationInputSchema: z.ZodType<Prisma.OneRepMaxOrderByWithAggregationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  lift: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => OneRepMaxCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => OneRepMaxAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OneRepMaxMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OneRepMaxMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => OneRepMaxSumOrderByAggregateInputSchema).optional()
}).strict();

export default OneRepMaxOrderByWithAggregationInputSchema;
