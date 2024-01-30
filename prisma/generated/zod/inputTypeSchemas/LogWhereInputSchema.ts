import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const LogWhereInputSchema: z.ZodType<Prisma.LogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogWhereInputSchema),z.lazy(() => LogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  response: z.lazy(() => JsonFilterSchema).optional(),
  request: z.lazy(() => JsonNullableFilterSchema).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default LogWhereInputSchema;
