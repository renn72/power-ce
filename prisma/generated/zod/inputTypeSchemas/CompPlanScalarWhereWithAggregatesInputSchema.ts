import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const CompPlanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompPlanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => CompPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompPlanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => CompPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export default CompPlanScalarWhereWithAggregatesInputSchema;
