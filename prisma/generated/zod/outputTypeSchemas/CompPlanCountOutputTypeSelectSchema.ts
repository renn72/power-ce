import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const CompPlanCountOutputTypeSelectSchema: z.ZodType<Prisma.CompPlanCountOutputTypeSelect> = z.object({
  value: z.boolean().optional(),
}).strict();

export default CompPlanCountOutputTypeSelectSchema;
