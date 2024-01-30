import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanCreateNestedOneWithoutValueInputSchema } from './CompPlanCreateNestedOneWithoutValueInputSchema';

export const CompPlanValueCreateInputSchema: z.ZodType<Prisma.CompPlanValueCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string(),
  value: z.string(),
  notes: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  isGoodLift: z.boolean().optional().nullable(),
  isComplete: z.boolean().optional(),
  CompPlan: z.lazy(() => CompPlanCreateNestedOneWithoutValueInputSchema)
}).strict();

export default CompPlanValueCreateInputSchema;
