import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftUncheckedCreateNestedManyWithoutLiftInputSchema } from './LiftUncheckedCreateNestedManyWithoutLiftInputSchema';

export const LiftsUncheckedCreateInputSchema: z.ZodType<Prisma.LiftsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  lift: z.lazy(() => LiftUncheckedCreateNestedManyWithoutLiftInputSchema).optional()
}).strict();

export default LiftsUncheckedCreateInputSchema;
