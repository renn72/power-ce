import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BlockMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlockMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  isGlobal: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isProgram: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.lazy(() => SortOrderSchema).optional(),
  userIdOfProgram: z.lazy(() => SortOrderSchema).optional(),
  isProgramActive: z.lazy(() => SortOrderSchema).optional(),
  isComplete: z.lazy(() => SortOrderSchema).optional(),
  isSecondary: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional(),
  flield4: z.lazy(() => SortOrderSchema).optional(),
  flield5: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BlockMinOrderByAggregateInputSchema;
