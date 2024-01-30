import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LogWhereInputSchema } from './LogWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const LogWhereUniqueInputSchema: z.ZodType<Prisma.LogWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  response: z.lazy(() => JsonFilterSchema).optional(),
  request: z.lazy(() => JsonNullableFilterSchema).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default LogWhereUniqueInputSchema;
