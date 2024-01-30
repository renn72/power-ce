import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const LogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LogScalarWhereWithAggregatesInputSchema),z.lazy(() => LogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  response: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  request: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  flield1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default LogScalarWhereWithAggregatesInputSchema;
