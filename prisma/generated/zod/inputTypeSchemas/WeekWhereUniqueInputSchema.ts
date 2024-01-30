import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DayListRelationFilterSchema } from './DayListRelationFilterSchema';
import { BlockNullableRelationFilterSchema } from './BlockNullableRelationFilterSchema';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';

export const WeekWhereUniqueInputSchema: z.ZodType<Prisma.WeekWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WeekWhereInputSchema),z.lazy(() => WeekWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeekWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeekWhereInputSchema),z.lazy(() => WeekWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isTemplate: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blockId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  day: z.lazy(() => DayListRelationFilterSchema).optional(),
  block: z.union([ z.lazy(() => BlockNullableRelationFilterSchema),z.lazy(() => BlockWhereInputSchema) ]).optional().nullable(),
}).strict());

export default WeekWhereUniqueInputSchema;
