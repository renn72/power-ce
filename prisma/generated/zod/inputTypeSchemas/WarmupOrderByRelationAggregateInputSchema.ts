import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WarmupOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WarmupOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WarmupOrderByRelationAggregateInputSchema;
