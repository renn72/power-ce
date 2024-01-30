import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RPEIndexSumOrderByAggregateInputSchema: z.ZodType<Prisma.RPEIndexSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RPEIndexSumOrderByAggregateInputSchema;
