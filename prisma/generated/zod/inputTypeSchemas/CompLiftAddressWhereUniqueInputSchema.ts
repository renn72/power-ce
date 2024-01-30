import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompLiftAddressWhereInputSchema } from './CompLiftAddressWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const CompLiftAddressWhereUniqueInputSchema: z.ZodType<Prisma.CompLiftAddressWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => CompLiftAddressWhereInputSchema),z.lazy(() => CompLiftAddressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompLiftAddressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompLiftAddressWhereInputSchema),z.lazy(() => CompLiftAddressWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default CompLiftAddressWhereUniqueInputSchema;
