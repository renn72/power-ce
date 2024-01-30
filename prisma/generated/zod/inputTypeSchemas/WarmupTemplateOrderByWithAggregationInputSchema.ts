import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WarmupTemplateCountOrderByAggregateInputSchema } from './WarmupTemplateCountOrderByAggregateInputSchema';
import { WarmupTemplateMaxOrderByAggregateInputSchema } from './WarmupTemplateMaxOrderByAggregateInputSchema';
import { WarmupTemplateMinOrderByAggregateInputSchema } from './WarmupTemplateMinOrderByAggregateInputSchema';

export const WarmupTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.WarmupTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WarmupTemplateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WarmupTemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WarmupTemplateMinOrderByAggregateInputSchema).optional()
}).strict();

export default WarmupTemplateOrderByWithAggregationInputSchema;
