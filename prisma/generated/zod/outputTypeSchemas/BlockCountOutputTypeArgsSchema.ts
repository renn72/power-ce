import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockCountOutputTypeSelectSchema } from './BlockCountOutputTypeSelectSchema';

export const BlockCountOutputTypeArgsSchema: z.ZodType<Prisma.BlockCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BlockCountOutputTypeSelectSchema).nullish(),
}).strict();

export default BlockCountOutputTypeSelectSchema;
