import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereInputSchema } from './DayWhereInputSchema';

export const DayListRelationFilterSchema: z.ZodType<Prisma.DayListRelationFilter> = z.object({
  every: z.lazy(() => DayWhereInputSchema).optional(),
  some: z.lazy(() => DayWhereInputSchema).optional(),
  none: z.lazy(() => DayWhereInputSchema).optional()
}).strict();

export default DayListRelationFilterSchema;
