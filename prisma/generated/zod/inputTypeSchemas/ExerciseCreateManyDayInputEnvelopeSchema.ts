import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateManyDayInputSchema } from './ExerciseCreateManyDayInputSchema';

export const ExerciseCreateManyDayInputEnvelopeSchema: z.ZodType<Prisma.ExerciseCreateManyDayInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExerciseCreateManyDayInputSchema),z.lazy(() => ExerciseCreateManyDayInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ExerciseCreateManyDayInputEnvelopeSchema;
