import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereInputSchema } from './DayWhereInputSchema';

export const DayNullableRelationFilterSchema: z.ZodType<Prisma.DayNullableRelationFilter> = z.object({
  is: z.lazy(() => DayWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DayWhereInputSchema).optional().nullable()
}).strict();

export default DayNullableRelationFilterSchema;
