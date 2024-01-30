import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CompPlanValueUncheckedCreateNestedManyWithoutCompPlanInputSchema } from './CompPlanValueUncheckedCreateNestedManyWithoutCompPlanInputSchema';

export const CompPlanUncheckedCreateInputSchema: z.ZodType<Prisma.CompPlanUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  isDeleted: z.boolean().optional(),
  value: z.lazy(() => CompPlanValueUncheckedCreateNestedManyWithoutCompPlanInputSchema).optional()
}).strict();

export default CompPlanUncheckedCreateInputSchema;
