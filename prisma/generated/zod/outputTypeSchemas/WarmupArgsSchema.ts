import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupSelectSchema } from '../inputTypeSchemas/WarmupSelectSchema';
import { WarmupIncludeSchema } from '../inputTypeSchemas/WarmupIncludeSchema';

export const WarmupArgsSchema: z.ZodType<Prisma.WarmupDefaultArgs> = z.object({
  select: z.lazy(() => WarmupSelectSchema).optional(),
  include: z.lazy(() => WarmupIncludeSchema).optional(),
}).strict();

export default WarmupArgsSchema;
