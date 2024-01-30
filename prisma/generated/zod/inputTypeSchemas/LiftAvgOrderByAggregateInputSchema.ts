import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const LiftAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LiftAvgOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default LiftAvgOrderByAggregateInputSchema;
