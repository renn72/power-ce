import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftWhereInputSchema } from './LiftWhereInputSchema';

export const LiftListRelationFilterSchema: z.ZodType<Prisma.LiftListRelationFilter> = z.object({
  every: z.lazy(() => LiftWhereInputSchema).optional(),
  some: z.lazy(() => LiftWhereInputSchema).optional(),
  none: z.lazy(() => LiftWhereInputSchema).optional()
}).strict();

export default LiftListRelationFilterSchema;
