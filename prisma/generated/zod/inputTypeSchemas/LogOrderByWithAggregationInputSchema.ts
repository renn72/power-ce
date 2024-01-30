import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { LogCountOrderByAggregateInputSchema } from './LogCountOrderByAggregateInputSchema';
import { LogMaxOrderByAggregateInputSchema } from './LogMaxOrderByAggregateInputSchema';
import { LogMinOrderByAggregateInputSchema } from './LogMinOrderByAggregateInputSchema';

export const LogOrderByWithAggregationInputSchema: z.ZodType<Prisma.LogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  request: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LogMinOrderByAggregateInputSchema).optional()
}).strict();

export default LogOrderByWithAggregationInputSchema;
