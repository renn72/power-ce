import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftCreateManyLiftInputSchema } from './LiftCreateManyLiftInputSchema';

export const LiftCreateManyLiftInputEnvelopeSchema: z.ZodType<Prisma.LiftCreateManyLiftInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LiftCreateManyLiftInputSchema),z.lazy(() => LiftCreateManyLiftInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default LiftCreateManyLiftInputEnvelopeSchema;
