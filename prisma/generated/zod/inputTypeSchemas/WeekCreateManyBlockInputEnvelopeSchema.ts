import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekCreateManyBlockInputSchema } from './WeekCreateManyBlockInputSchema';

export const WeekCreateManyBlockInputEnvelopeSchema: z.ZodType<Prisma.WeekCreateManyBlockInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WeekCreateManyBlockInputSchema),z.lazy(() => WeekCreateManyBlockInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default WeekCreateManyBlockInputEnvelopeSchema;
