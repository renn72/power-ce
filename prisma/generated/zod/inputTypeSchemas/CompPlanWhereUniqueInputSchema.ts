import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanWhereInputSchema } from './CompPlanWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { CompPlanValueListRelationFilterSchema } from './CompPlanValueListRelationFilterSchema';

export const CompPlanWhereUniqueInputSchema: z.ZodType<Prisma.CompPlanWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompPlanWhereInputSchema),z.lazy(() => CompPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompPlanWhereInputSchema),z.lazy(() => CompPlanWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  value: z.lazy(() => CompPlanValueListRelationFilterSchema).optional()
}).strict());

export default CompPlanWhereUniqueInputSchema;
