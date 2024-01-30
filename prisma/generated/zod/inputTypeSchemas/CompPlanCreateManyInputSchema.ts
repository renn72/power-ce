import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CompPlanCreateManyInputSchema: z.ZodType<Prisma.CompPlanCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean().optional()
}).strict();

export default CompPlanCreateManyInputSchema;
