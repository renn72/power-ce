import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SetOrderByRelationAggregateInputSchema;
