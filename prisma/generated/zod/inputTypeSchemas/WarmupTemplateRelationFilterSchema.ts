import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupTemplateWhereInputSchema } from './WarmupTemplateWhereInputSchema';

export const WarmupTemplateRelationFilterSchema: z.ZodType<Prisma.WarmupTemplateRelationFilter> = z.object({
  is: z.lazy(() => WarmupTemplateWhereInputSchema).optional(),
  isNot: z.lazy(() => WarmupTemplateWhereInputSchema).optional()
}).strict();

export default WarmupTemplateRelationFilterSchema;
