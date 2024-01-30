import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const CompPlanValueMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompPlanValueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  CompPlanId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  isGoodLift: z.lazy(() => SortOrderSchema).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default CompPlanValueMinOrderByAggregateInputSchema;
