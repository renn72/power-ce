import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueCreateNestedManyWithoutCompPlanInputSchema } from './CompPlanValueCreateNestedManyWithoutCompPlanInputSchema';

export const CompPlanCreateInputSchema: z.ZodType<Prisma.CompPlanCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean().optional(),
  value: z.lazy(() => CompPlanValueCreateNestedManyWithoutCompPlanInputSchema).optional()
}).strict();

export default CompPlanCreateInputSchema;
