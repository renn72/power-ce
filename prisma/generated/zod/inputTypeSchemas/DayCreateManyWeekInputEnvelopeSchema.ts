import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateManyWeekInputSchema } from './DayCreateManyWeekInputSchema';

export const DayCreateManyWeekInputEnvelopeSchema: z.ZodType<Prisma.DayCreateManyWeekInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DayCreateManyWeekInputSchema),z.lazy(() => DayCreateManyWeekInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default DayCreateManyWeekInputEnvelopeSchema;
