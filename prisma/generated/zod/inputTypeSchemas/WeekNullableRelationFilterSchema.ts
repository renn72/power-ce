import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';

export const WeekNullableRelationFilterSchema: z.ZodType<Prisma.WeekNullableRelationFilter> = z.object({
  is: z.lazy(() => WeekWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WeekWhereInputSchema).optional().nullable()
}).strict();

export default WeekNullableRelationFilterSchema;
