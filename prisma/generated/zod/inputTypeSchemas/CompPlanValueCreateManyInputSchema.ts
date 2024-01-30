import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CompPlanValueCreateManyInputSchema: z.ZodType<Prisma.CompPlanValueCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  CompPlanId: z.string(),
  name: z.string(),
  value: z.string(),
  notes: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  isGoodLift: z.boolean().optional().nullable(),
  isComplete: z.boolean().optional()
}).strict();

export default CompPlanValueCreateManyInputSchema;
