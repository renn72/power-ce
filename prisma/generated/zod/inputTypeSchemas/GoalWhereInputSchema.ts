import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserProfileRelationFilterSchema } from './UserProfileRelationFilterSchema';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const GoalWhereInputSchema: z.ZodType<Prisma.GoalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goal: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isComplete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserProfileRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
}).strict();

export default GoalWhereInputSchema;
