import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogWhereInputSchema } from './DailyLogWhereInputSchema';

export const DailyLogListRelationFilterSchema: z.ZodType<Prisma.DailyLogListRelationFilter> = z.object({
  every: z.lazy(() => DailyLogWhereInputSchema).optional(),
  some: z.lazy(() => DailyLogWhereInputSchema).optional(),
  none: z.lazy(() => DailyLogWhereInputSchema).optional()
}).strict();

export default DailyLogListRelationFilterSchema;
