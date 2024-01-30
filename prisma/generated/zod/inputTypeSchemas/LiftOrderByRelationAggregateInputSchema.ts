import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const LiftOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LiftOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default LiftOrderByRelationAggregateInputSchema;
