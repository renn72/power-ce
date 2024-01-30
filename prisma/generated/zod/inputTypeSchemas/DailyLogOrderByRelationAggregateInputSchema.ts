import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const DailyLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DailyLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default DailyLogOrderByRelationAggregateInputSchema;
