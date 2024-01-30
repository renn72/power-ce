import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const CompPlanValueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompPlanValueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default CompPlanValueOrderByRelationAggregateInputSchema;
