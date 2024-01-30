import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockSelectSchema } from '../inputTypeSchemas/BlockSelectSchema';
import { BlockIncludeSchema } from '../inputTypeSchemas/BlockIncludeSchema';

export const BlockArgsSchema: z.ZodType<Prisma.BlockDefaultArgs> = z.object({
  select: z.lazy(() => BlockSelectSchema).optional(),
  include: z.lazy(() => BlockIncludeSchema).optional(),
}).strict();

export default BlockArgsSchema;
