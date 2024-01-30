import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupFindManyArgsSchema } from "../outputTypeSchemas/WarmupFindManyArgsSchema"
import { WarmupTemplateCountOutputTypeArgsSchema } from "../outputTypeSchemas/WarmupTemplateCountOutputTypeArgsSchema"

export const WarmupTemplateIncludeSchema: z.ZodType<Prisma.WarmupTemplateInclude> = z.object({
  warmups: z.union([z.boolean(),z.lazy(() => WarmupFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WarmupTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WarmupTemplateIncludeSchema;
