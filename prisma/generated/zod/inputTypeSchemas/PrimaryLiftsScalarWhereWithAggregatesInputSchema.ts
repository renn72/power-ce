import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const PrimaryLiftsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PrimaryLiftsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PrimaryLiftsScalarWhereWithAggregatesInputSchema),z.lazy(() => PrimaryLiftsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrimaryLiftsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrimaryLiftsScalarWhereWithAggregatesInputSchema),z.lazy(() => PrimaryLiftsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  creadedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default PrimaryLiftsScalarWhereWithAggregatesInputSchema;
