import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WarmupWhereInputSchema } from './WarmupWhereInputSchema';

export const WarmupListRelationFilterSchema: z.ZodType<Prisma.WarmupListRelationFilter> = z.object({
  every: z.lazy(() => WarmupWhereInputSchema).optional(),
  some: z.lazy(() => WarmupWhereInputSchema).optional(),
  none: z.lazy(() => WarmupWhereInputSchema).optional()
}).strict();

export default WarmupListRelationFilterSchema;
