import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const OneRepMaxSumOrderByAggregateInputSchema: z.ZodType<Prisma.OneRepMaxSumOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default OneRepMaxSumOrderByAggregateInputSchema;
