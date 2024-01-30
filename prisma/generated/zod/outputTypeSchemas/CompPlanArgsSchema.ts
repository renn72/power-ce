import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompPlanSelectSchema } from '../inputTypeSchemas/CompPlanSelectSchema';
import { CompPlanIncludeSchema } from '../inputTypeSchemas/CompPlanIncludeSchema';

export const CompPlanArgsSchema: z.ZodType<Prisma.CompPlanDefaultArgs> = z.object({
  select: z.lazy(() => CompPlanSelectSchema).optional(),
  include: z.lazy(() => CompPlanIncludeSchema).optional(),
}).strict();

export default CompPlanArgsSchema;
