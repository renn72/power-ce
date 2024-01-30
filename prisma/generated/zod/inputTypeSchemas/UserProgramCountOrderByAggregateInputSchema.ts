import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserProgramCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProgramCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.lazy(() => SortOrderSchema).optional(),
  isProgramActive: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserProgramCountOrderByAggregateInputSchema;
