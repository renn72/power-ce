import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalCreateManyUserInputSchema } from './GoalCreateManyUserInputSchema';

export const GoalCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GoalCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GoalCreateManyUserInputSchema),z.lazy(() => GoalCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default GoalCreateManyUserInputEnvelopeSchema;
