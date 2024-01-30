import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const LiftCountOrderByAggregateInputSchema: z.ZodType<Prisma.LiftCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  createdAtUser: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.lazy(() => SortOrderSchema).optional(),
  liftId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  liftName: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default LiftCountOrderByAggregateInputSchema;
