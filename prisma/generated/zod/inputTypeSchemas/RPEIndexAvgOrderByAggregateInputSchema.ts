import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RPEIndexAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RPEIndexAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RPEIndexAvgOrderByAggregateInputSchema;
