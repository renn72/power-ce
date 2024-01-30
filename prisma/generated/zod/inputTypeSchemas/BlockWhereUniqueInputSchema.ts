import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { WeekListRelationFilterSchema } from './WeekListRelationFilterSchema';

export const BlockWhereUniqueInputSchema: z.ZodType<Prisma.BlockWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => BlockWhereInputSchema),z.lazy(() => BlockWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlockWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlockWhereInputSchema),z.lazy(() => BlockWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isGlobal: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isProgram: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userIdOfProgram: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isProgramActive: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isComplete: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isSecondary: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  week: z.lazy(() => WeekListRelationFilterSchema).optional()
}).strict());

export default BlockWhereUniqueInputSchema;
