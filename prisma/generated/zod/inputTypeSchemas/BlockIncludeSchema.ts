import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WeekFindManyArgsSchema } from "../outputTypeSchemas/WeekFindManyArgsSchema"
import { BlockCountOutputTypeArgsSchema } from "../outputTypeSchemas/BlockCountOutputTypeArgsSchema"

export const BlockIncludeSchema: z.ZodType<Prisma.BlockInclude> = z.object({
  week: z.union([z.boolean(),z.lazy(() => WeekFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlockCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default BlockIncludeSchema;
