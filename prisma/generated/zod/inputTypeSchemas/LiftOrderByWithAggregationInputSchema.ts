import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { LiftCountOrderByAggregateInputSchema } from './LiftCountOrderByAggregateInputSchema';
import { LiftAvgOrderByAggregateInputSchema } from './LiftAvgOrderByAggregateInputSchema';
import { LiftMaxOrderByAggregateInputSchema } from './LiftMaxOrderByAggregateInputSchema';
import { LiftMinOrderByAggregateInputSchema } from './LiftMinOrderByAggregateInputSchema';
import { LiftSumOrderByAggregateInputSchema } from './LiftSumOrderByAggregateInputSchema';

export const LiftOrderByWithAggregationInputSchema: z.ZodType<Prisma.LiftOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdAtUser: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  liftId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  liftName: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LiftCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LiftAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LiftMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LiftMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LiftSumOrderByAggregateInputSchema).optional()
}).strict();

export default LiftOrderByWithAggregationInputSchema;
