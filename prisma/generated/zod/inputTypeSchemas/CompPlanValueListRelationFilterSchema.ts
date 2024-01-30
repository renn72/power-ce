import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueWhereInputSchema } from './CompPlanValueWhereInputSchema';

export const CompPlanValueListRelationFilterSchema: z.ZodType<Prisma.CompPlanValueListRelationFilter> = z.object({
  every: z.lazy(() => CompPlanValueWhereInputSchema).optional(),
  some: z.lazy(() => CompPlanValueWhereInputSchema).optional(),
  none: z.lazy(() => CompPlanValueWhereInputSchema).optional()
}).strict();

export default CompPlanValueListRelationFilterSchema;
