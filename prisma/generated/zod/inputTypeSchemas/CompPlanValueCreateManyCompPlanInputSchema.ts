import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CompPlanValueCreateManyCompPlanInputSchema: z.ZodType<Prisma.CompPlanValueCreateManyCompPlanInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string(),
  value: z.string(),
  notes: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  isGoodLift: z.boolean().optional().nullable(),
  isComplete: z.boolean().optional()
}).strict();

export default CompPlanValueCreateManyCompPlanInputSchema;
