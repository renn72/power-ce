import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsWhereInputSchema } from './LiftsWhereInputSchema';

export const LiftsRelationFilterSchema: z.ZodType<Prisma.LiftsRelationFilter> = z.object({
  is: z.lazy(() => LiftsWhereInputSchema).optional(),
  isNot: z.lazy(() => LiftsWhereInputSchema).optional()
}).strict();

export default LiftsRelationFilterSchema;
