import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserProgramCountOrderByAggregateInputSchema } from './UserProgramCountOrderByAggregateInputSchema';
import { UserProgramMaxOrderByAggregateInputSchema } from './UserProgramMaxOrderByAggregateInputSchema';
import { UserProgramMinOrderByAggregateInputSchema } from './UserProgramMinOrderByAggregateInputSchema';

export const UserProgramOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProgramOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  trainerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  programId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isProgramActive: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProgramCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProgramMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProgramMinOrderByAggregateInputSchema).optional()
}).strict();

export default UserProgramOrderByWithAggregationInputSchema;
