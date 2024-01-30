import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueWhereInputSchema } from './CompPlanValueWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { CompPlanRelationFilterSchema } from './CompPlanRelationFilterSchema';
import { CompPlanWhereInputSchema } from './CompPlanWhereInputSchema';

export const CompPlanValueWhereUniqueInputSchema: z.ZodType<Prisma.CompPlanValueWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompPlanValueWhereInputSchema),z.lazy(() => CompPlanValueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompPlanValueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompPlanValueWhereInputSchema),z.lazy(() => CompPlanValueWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  CompPlanId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isGoodLift: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isComplete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  CompPlan: z.union([ z.lazy(() => CompPlanRelationFilterSchema),z.lazy(() => CompPlanWhereInputSchema) ]).optional(),
}).strict());

export default CompPlanValueWhereUniqueInputSchema;
