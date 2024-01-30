import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CompDateCountOrderByAggregateInputSchema } from './CompDateCountOrderByAggregateInputSchema';
import { CompDateMaxOrderByAggregateInputSchema } from './CompDateMaxOrderByAggregateInputSchema';
import { CompDateMinOrderByAggregateInputSchema } from './CompDateMinOrderByAggregateInputSchema';

export const CompDateOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompDateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield4: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield5: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CompDateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompDateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompDateMinOrderByAggregateInputSchema).optional()
}).strict();

export default CompDateOrderByWithAggregationInputSchema;
