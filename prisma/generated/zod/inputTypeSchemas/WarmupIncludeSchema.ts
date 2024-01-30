import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateArgsSchema } from "../outputTypeSchemas/WarmupTemplateArgsSchema"

export const WarmupIncludeSchema: z.ZodType<Prisma.WarmupInclude> = z.object({
  warmupTemplate: z.union([z.boolean(),z.lazy(() => WarmupTemplateArgsSchema)]).optional(),
}).strict()

export default WarmupIncludeSchema;
