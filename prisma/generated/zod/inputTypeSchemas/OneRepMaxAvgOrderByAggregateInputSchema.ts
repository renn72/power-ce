import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const OneRepMaxAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OneRepMaxAvgOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default OneRepMaxAvgOrderByAggregateInputSchema;
