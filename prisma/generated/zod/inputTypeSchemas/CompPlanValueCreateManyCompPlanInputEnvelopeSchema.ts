import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueCreateManyCompPlanInputSchema } from './CompPlanValueCreateManyCompPlanInputSchema';

export const CompPlanValueCreateManyCompPlanInputEnvelopeSchema: z.ZodType<Prisma.CompPlanValueCreateManyCompPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompPlanValueCreateManyCompPlanInputSchema),z.lazy(() => CompPlanValueCreateManyCompPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default CompPlanValueCreateManyCompPlanInputEnvelopeSchema;
