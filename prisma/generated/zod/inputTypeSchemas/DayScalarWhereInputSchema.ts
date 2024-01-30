import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const DayScalarWhereInputSchema: z.ZodType<Prisma.DayScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
}).strict();

export default DayScalarWhereInputSchema;
