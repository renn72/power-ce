import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PrimaryLiftsWhereInputSchema } from './PrimaryLiftsWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const PrimaryLiftsWhereUniqueInputSchema: z.ZodType<Prisma.PrimaryLiftsWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => PrimaryLiftsWhereInputSchema),z.lazy(() => PrimaryLiftsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrimaryLiftsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrimaryLiftsWhereInputSchema),z.lazy(() => PrimaryLiftsWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creadedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default PrimaryLiftsWhereUniqueInputSchema;
