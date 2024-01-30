import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftFindManyArgsSchema } from "../outputTypeSchemas/LiftFindManyArgsSchema"
import { LiftsCountOutputTypeArgsSchema } from "../outputTypeSchemas/LiftsCountOutputTypeArgsSchema"

export const LiftsIncludeSchema: z.ZodType<Prisma.LiftsInclude> = z.object({
  lift: z.union([z.boolean(),z.lazy(() => LiftFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LiftsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default LiftsIncludeSchema;
