import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockCreateNestedOneWithoutWeekInputSchema } from './BlockCreateNestedOneWithoutWeekInputSchema';

export const WeekCreateWithoutDayInputSchema: z.ZodType<Prisma.WeekCreateWithoutDayInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  isTemplate: z.boolean().optional().nullable(),
  isDeleted: z.boolean().optional(),
  userId: z.string().optional().nullable(),
  trainerId: z.string().optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable(),
  block: z.lazy(() => BlockCreateNestedOneWithoutWeekInputSchema).optional()
}).strict();

export default WeekCreateWithoutDayInputSchema;
