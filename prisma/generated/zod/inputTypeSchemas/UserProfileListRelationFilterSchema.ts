import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const UserProfileListRelationFilterSchema: z.ZodType<Prisma.UserProfileListRelationFilter> = z.object({
  every: z.lazy(() => UserProfileWhereInputSchema).optional(),
  some: z.lazy(() => UserProfileWhereInputSchema).optional(),
  none: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export default UserProfileListRelationFilterSchema;
