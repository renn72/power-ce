import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CompPlanOrderByWithRelationInputSchema } from './CompPlanOrderByWithRelationInputSchema';

export const CompPlanValueOrderByWithRelationInputSchema: z.ZodType<Prisma.CompPlanValueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  CompPlanId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isGoodLift: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  CompPlan: z.lazy(() => CompPlanOrderByWithRelationInputSchema).optional()
}).strict();

export default CompPlanValueOrderByWithRelationInputSchema;
