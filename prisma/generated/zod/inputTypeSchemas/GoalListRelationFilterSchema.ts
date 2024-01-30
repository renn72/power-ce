import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalWhereInputSchema } from './GoalWhereInputSchema';

export const GoalListRelationFilterSchema: z.ZodType<Prisma.GoalListRelationFilter> = z.object({
  every: z.lazy(() => GoalWhereInputSchema).optional(),
  some: z.lazy(() => GoalWhereInputSchema).optional(),
  none: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export default GoalListRelationFilterSchema;
