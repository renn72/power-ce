import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanArgsSchema } from "../outputTypeSchemas/CompPlanArgsSchema"

export const CompPlanValueIncludeSchema: z.ZodType<Prisma.CompPlanValueInclude> = z.object({
  CompPlan: z.union([z.boolean(),z.lazy(() => CompPlanArgsSchema)]).optional(),
}).strict()

export default CompPlanValueIncludeSchema;
