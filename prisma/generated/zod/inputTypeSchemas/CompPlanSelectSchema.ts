import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueFindManyArgsSchema } from "../outputTypeSchemas/CompPlanValueFindManyArgsSchema"
import { CompPlanCountOutputTypeArgsSchema } from "../outputTypeSchemas/CompPlanCountOutputTypeArgsSchema"

export const CompPlanSelectSchema: z.ZodType<Prisma.CompPlanSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  value: z.union([z.boolean(),z.lazy(() => CompPlanValueFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default CompPlanSelectSchema;
