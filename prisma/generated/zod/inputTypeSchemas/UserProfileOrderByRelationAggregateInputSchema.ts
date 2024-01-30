import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProfileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserProfileOrderByRelationAggregateInputSchema;
