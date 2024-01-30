import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { LiftsCountOrderByAggregateInputSchema } from './LiftsCountOrderByAggregateInputSchema';
import { LiftsMaxOrderByAggregateInputSchema } from './LiftsMaxOrderByAggregateInputSchema';
import { LiftsMinOrderByAggregateInputSchema } from './LiftsMinOrderByAggregateInputSchema';

export const LiftsOrderByWithAggregationInputSchema: z.ZodType<Prisma.LiftsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LiftsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LiftsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LiftsMinOrderByAggregateInputSchema).optional()
}).strict();

export default LiftsOrderByWithAggregationInputSchema;
