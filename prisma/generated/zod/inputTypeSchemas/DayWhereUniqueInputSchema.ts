import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereInputSchema } from './DayWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { ExerciseListRelationFilterSchema } from './ExerciseListRelationFilterSchema';
import { WeekNullableRelationFilterSchema } from './WeekNullableRelationFilterSchema';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';

export const DayWhereUniqueInputSchema: z.ZodType<Prisma.DayWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isTemplate: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isRestDay: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  weekId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  warmupTemplateId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  energyRating: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isComplete: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  exercise: z.lazy(() => ExerciseListRelationFilterSchema).optional(),
  week: z.union([ z.lazy(() => WeekNullableRelationFilterSchema),z.lazy(() => WeekWhereInputSchema) ]).optional().nullable(),
}).strict());

export default DayWhereUniqueInputSchema;
