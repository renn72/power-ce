import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CompPlanValueCountOrderByAggregateInputSchema } from './CompPlanValueCountOrderByAggregateInputSchema';
import { CompPlanValueMaxOrderByAggregateInputSchema } from './CompPlanValueMaxOrderByAggregateInputSchema';
import { CompPlanValueMinOrderByAggregateInputSchema } from './CompPlanValueMinOrderByAggregateInputSchema';

export const CompPlanValueOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompPlanValueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  CompPlanId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isGoodLift: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompPlanValueCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompPlanValueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompPlanValueMinOrderByAggregateInputSchema).optional()
}).strict();

export default CompPlanValueOrderByWithAggregationInputSchema;
