import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogCreateManyUserProfileInputSchema } from './DailyLogCreateManyUserProfileInputSchema';

export const DailyLogCreateManyUserProfileInputEnvelopeSchema: z.ZodType<Prisma.DailyLogCreateManyUserProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DailyLogCreateManyUserProfileInputSchema),z.lazy(() => DailyLogCreateManyUserProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default DailyLogCreateManyUserProfileInputEnvelopeSchema;
