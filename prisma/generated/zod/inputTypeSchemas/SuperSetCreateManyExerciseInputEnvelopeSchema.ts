import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetCreateManyExerciseInputSchema } from './SuperSetCreateManyExerciseInputSchema';

export const SuperSetCreateManyExerciseInputEnvelopeSchema: z.ZodType<Prisma.SuperSetCreateManyExerciseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SuperSetCreateManyExerciseInputSchema),z.lazy(() => SuperSetCreateManyExerciseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default SuperSetCreateManyExerciseInputEnvelopeSchema;
