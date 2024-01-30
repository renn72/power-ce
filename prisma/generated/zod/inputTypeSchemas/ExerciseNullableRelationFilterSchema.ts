import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';

export const ExerciseNullableRelationFilterSchema: z.ZodType<Prisma.ExerciseNullableRelationFilter> = z.object({
  is: z.lazy(() => ExerciseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ExerciseWhereInputSchema).optional().nullable()
}).strict();

export default ExerciseNullableRelationFilterSchema;
