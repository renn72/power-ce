import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const GoalMinOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  goal: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default GoalMinOrderByAggregateInputSchema;
