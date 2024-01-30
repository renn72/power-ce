import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupCreateManyWarmupTemplateInputSchema } from './WarmupCreateManyWarmupTemplateInputSchema';

export const WarmupCreateManyWarmupTemplateInputEnvelopeSchema: z.ZodType<Prisma.WarmupCreateManyWarmupTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WarmupCreateManyWarmupTemplateInputSchema),z.lazy(() => WarmupCreateManyWarmupTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default WarmupCreateManyWarmupTemplateInputEnvelopeSchema;
