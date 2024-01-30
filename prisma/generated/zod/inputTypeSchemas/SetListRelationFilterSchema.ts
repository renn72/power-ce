import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetWhereInputSchema } from './SetWhereInputSchema';

export const SetListRelationFilterSchema: z.ZodType<Prisma.SetListRelationFilter> = z.object({
  every: z.lazy(() => SetWhereInputSchema).optional(),
  some: z.lazy(() => SetWhereInputSchema).optional(),
  none: z.lazy(() => SetWhereInputSchema).optional()
}).strict();

export default SetListRelationFilterSchema;
