import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanWhereInputSchema } from './CompPlanWhereInputSchema';

export const CompPlanRelationFilterSchema: z.ZodType<Prisma.CompPlanRelationFilter> = z.object({
  is: z.lazy(() => CompPlanWhereInputSchema).optional(),
  isNot: z.lazy(() => CompPlanWhereInputSchema).optional()
}).strict();

export default CompPlanRelationFilterSchema;
