import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecordSumOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecordSumOrderByAggregateInputSchema;
