import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { PrimaryLiftsCountOrderByAggregateInputSchema } from './PrimaryLiftsCountOrderByAggregateInputSchema';
import { PrimaryLiftsMaxOrderByAggregateInputSchema } from './PrimaryLiftsMaxOrderByAggregateInputSchema';
import { PrimaryLiftsMinOrderByAggregateInputSchema } from './PrimaryLiftsMinOrderByAggregateInputSchema';

export const PrimaryLiftsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PrimaryLiftsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creadedBy: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PrimaryLiftsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PrimaryLiftsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PrimaryLiftsMinOrderByAggregateInputSchema).optional()
}).strict();

export default PrimaryLiftsOrderByWithAggregationInputSchema;
