import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { CompPlanCountOrderByAggregateInputSchema } from './CompPlanCountOrderByAggregateInputSchema';
import { CompPlanMaxOrderByAggregateInputSchema } from './CompPlanMaxOrderByAggregateInputSchema';
import { CompPlanMinOrderByAggregateInputSchema } from './CompPlanMinOrderByAggregateInputSchema';

export const CompPlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompPlanOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompPlanCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompPlanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompPlanMinOrderByAggregateInputSchema).optional()
}).strict();

export default CompPlanOrderByWithAggregationInputSchema;
