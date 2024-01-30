import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { RPEIndexCountOrderByAggregateInputSchema } from './RPEIndexCountOrderByAggregateInputSchema';
import { RPEIndexAvgOrderByAggregateInputSchema } from './RPEIndexAvgOrderByAggregateInputSchema';
import { RPEIndexMaxOrderByAggregateInputSchema } from './RPEIndexMaxOrderByAggregateInputSchema';
import { RPEIndexMinOrderByAggregateInputSchema } from './RPEIndexMinOrderByAggregateInputSchema';
import { RPEIndexSumOrderByAggregateInputSchema } from './RPEIndexSumOrderByAggregateInputSchema';

export const RPEIndexOrderByWithAggregationInputSchema: z.ZodType<Prisma.RPEIndexOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RPEIndexCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RPEIndexAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RPEIndexMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RPEIndexMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RPEIndexSumOrderByAggregateInputSchema).optional()
}).strict();

export default RPEIndexOrderByWithAggregationInputSchema;
