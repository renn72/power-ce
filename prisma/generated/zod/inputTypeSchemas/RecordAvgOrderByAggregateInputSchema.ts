import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecordAvgOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RecordAvgOrderByAggregateInputSchema;
