import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const PrimaryLiftsWhereInputSchema: z.ZodType<Prisma.PrimaryLiftsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrimaryLiftsWhereInputSchema),z.lazy(() => PrimaryLiftsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrimaryLiftsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrimaryLiftsWhereInputSchema),z.lazy(() => PrimaryLiftsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  creadedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default PrimaryLiftsWhereInputSchema;
