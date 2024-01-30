import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProgramWhereInputSchema } from './UserProgramWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const UserProgramWhereUniqueInputSchema: z.ZodType<Prisma.UserProgramWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserProgramWhereInputSchema),z.lazy(() => UserProgramWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProgramWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProgramWhereInputSchema),z.lazy(() => UserProgramWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isProgramActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export default UserProgramWhereUniqueInputSchema;
