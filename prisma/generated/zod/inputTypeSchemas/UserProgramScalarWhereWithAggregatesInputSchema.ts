import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const UserProgramScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProgramScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProgramScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProgramScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProgramScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProgramScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProgramScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  trainerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  programId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isProgramActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default UserProgramScalarWhereWithAggregatesInputSchema;
