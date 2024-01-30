import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';

export const ExerciseListRelationFilterSchema: z.ZodType<Prisma.ExerciseListRelationFilter> = z.object({
  every: z.lazy(() => ExerciseWhereInputSchema).optional(),
  some: z.lazy(() => ExerciseWhereInputSchema).optional(),
  none: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export default ExerciseListRelationFilterSchema;
