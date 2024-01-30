import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetWhereInputSchema } from './SuperSetWhereInputSchema';

export const SuperSetListRelationFilterSchema: z.ZodType<Prisma.SuperSetListRelationFilter> = z.object({
  every: z.lazy(() => SuperSetWhereInputSchema).optional(),
  some: z.lazy(() => SuperSetWhereInputSchema).optional(),
  none: z.lazy(() => SuperSetWhereInputSchema).optional()
}).strict();

export default SuperSetListRelationFilterSchema;
