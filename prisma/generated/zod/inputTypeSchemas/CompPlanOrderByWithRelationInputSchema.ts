import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { CompPlanValueOrderByRelationAggregateInputSchema } from './CompPlanValueOrderByRelationAggregateInputSchema';

export const CompPlanOrderByWithRelationInputSchema: z.ZodType<Prisma.CompPlanOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => CompPlanValueOrderByRelationAggregateInputSchema).optional()
}).strict();

export default CompPlanOrderByWithRelationInputSchema;
