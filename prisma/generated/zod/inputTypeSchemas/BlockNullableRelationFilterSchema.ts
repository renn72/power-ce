import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';

export const BlockNullableRelationFilterSchema: z.ZodType<Prisma.BlockNullableRelationFilter> = z.object({
  is: z.lazy(() => BlockWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => BlockWhereInputSchema).optional().nullable()
}).strict();

export default BlockNullableRelationFilterSchema;
