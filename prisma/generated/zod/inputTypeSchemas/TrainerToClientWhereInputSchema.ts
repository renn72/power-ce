import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const TrainerToClientWhereInputSchema: z.ZodType<Prisma.TrainerToClientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TrainerToClientWhereInputSchema),z.lazy(() => TrainerToClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrainerToClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrainerToClientWhereInputSchema),z.lazy(() => TrainerToClientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trainerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default TrainerToClientWhereInputSchema;
