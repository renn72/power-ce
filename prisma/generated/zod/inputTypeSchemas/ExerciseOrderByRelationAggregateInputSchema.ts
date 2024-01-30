import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ExerciseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExerciseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ExerciseOrderByRelationAggregateInputSchema;
