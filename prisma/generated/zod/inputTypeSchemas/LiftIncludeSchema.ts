import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsArgsSchema } from "../outputTypeSchemas/LiftsArgsSchema"

export const LiftIncludeSchema: z.ZodType<Prisma.LiftInclude> = z.object({
  lift: z.union([z.boolean(),z.lazy(() => LiftsArgsSchema)]).optional(),
}).strict()

export default LiftIncludeSchema;
