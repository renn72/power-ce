import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsWhereInputSchema } from './LiftsWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { LiftListRelationFilterSchema } from './LiftListRelationFilterSchema';

export const LiftsWhereUniqueInputSchema: z.ZodType<Prisma.LiftsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LiftsWhereInputSchema),z.lazy(() => LiftsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LiftsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LiftsWhereInputSchema),z.lazy(() => LiftsWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lift: z.lazy(() => LiftListRelationFilterSchema).optional()
}).strict());

export default LiftsWhereUniqueInputSchema;
