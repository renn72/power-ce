import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const UserProfileRelationFilterSchema: z.ZodType<Prisma.UserProfileRelationFilter> = z.object({
  is: z.lazy(() => UserProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export default UserProfileRelationFilterSchema;
