import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WarmupCountOrderByAggregateInputSchema } from './WarmupCountOrderByAggregateInputSchema';
import { WarmupMaxOrderByAggregateInputSchema } from './WarmupMaxOrderByAggregateInputSchema';
import { WarmupMinOrderByAggregateInputSchema } from './WarmupMinOrderByAggregateInputSchema';

export const WarmupOrderByWithAggregationInputSchema: z.ZodType<Prisma.WarmupOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  warmupTemplateId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WarmupCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WarmupMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WarmupMinOrderByAggregateInputSchema).optional()
}).strict();

export default WarmupOrderByWithAggregationInputSchema;
