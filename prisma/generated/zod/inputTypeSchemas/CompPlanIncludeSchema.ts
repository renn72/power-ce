import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueFindManyArgsSchema } from "../outputTypeSchemas/CompPlanValueFindManyArgsSchema"
import { CompPlanCountOutputTypeArgsSchema } from "../outputTypeSchemas/CompPlanCountOutputTypeArgsSchema"

export const CompPlanIncludeSchema: z.ZodType<Prisma.CompPlanInclude> = z.object({
  value: z.union([z.boolean(),z.lazy(() => CompPlanValueFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default CompPlanIncludeSchema;
