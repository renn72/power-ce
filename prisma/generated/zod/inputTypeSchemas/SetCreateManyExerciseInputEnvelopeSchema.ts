import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetCreateManyExerciseInputSchema } from './SetCreateManyExerciseInputSchema';

export const SetCreateManyExerciseInputEnvelopeSchema: z.ZodType<Prisma.SetCreateManyExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SetCreateManyExerciseInputSchema),z.lazy(() => SetCreateManyExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default SetCreateManyExerciseInputEnvelopeSchema;
