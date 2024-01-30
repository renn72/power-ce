import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const SetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SetAvgOrderByAggregateInput> = z.object({
  rep: z.lazy(() => SortOrderSchema).optional(),
  rpe: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  actualReps: z.lazy(() => SortOrderSchema).optional(),
  estiamtedOnerm: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default SetAvgOrderByAggregateInputSchema;
