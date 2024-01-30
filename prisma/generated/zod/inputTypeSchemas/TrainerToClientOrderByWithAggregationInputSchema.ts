import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { TrainerToClientCountOrderByAggregateInputSchema } from './TrainerToClientCountOrderByAggregateInputSchema';
import { TrainerToClientMaxOrderByAggregateInputSchema } from './TrainerToClientMaxOrderByAggregateInputSchema';
import { TrainerToClientMinOrderByAggregateInputSchema } from './TrainerToClientMinOrderByAggregateInputSchema';

export const TrainerToClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.TrainerToClientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TrainerToClientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TrainerToClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TrainerToClientMinOrderByAggregateInputSchema).optional()
}).strict();

export default TrainerToClientOrderByWithAggregationInputSchema;
