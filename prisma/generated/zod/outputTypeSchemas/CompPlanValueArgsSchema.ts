import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanValueSelectSchema } from '../inputTypeSchemas/CompPlanValueSelectSchema';
import { CompPlanValueIncludeSchema } from '../inputTypeSchemas/CompPlanValueIncludeSchema';

export const CompPlanValueArgsSchema: z.ZodType<Prisma.CompPlanValueDefaultArgs> = z.object({
  select: z.lazy(() => CompPlanValueSelectSchema).optional(),
  include: z.lazy(() => CompPlanValueIncludeSchema).optional(),
}).strict();

export default CompPlanValueArgsSchema;
