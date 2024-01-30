import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TrainerToClientWhereInputSchema } from './TrainerToClientWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const TrainerToClientWhereUniqueInputSchema: z.ZodType<Prisma.TrainerToClientWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TrainerToClientWhereInputSchema),z.lazy(() => TrainerToClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrainerToClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrainerToClientWhereInputSchema),z.lazy(() => TrainerToClientWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trainerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default TrainerToClientWhereUniqueInputSchema;
