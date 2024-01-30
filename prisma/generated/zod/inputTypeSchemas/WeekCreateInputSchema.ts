import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateNestedManyWithoutWeekInputSchema } from './DayCreateNestedManyWithoutWeekInputSchema';
import { BlockCreateNestedOneWithoutWeekInputSchema } from './BlockCreateNestedOneWithoutWeekInputSchema';

export const WeekCreateInputSchema: z.ZodType<Prisma.WeekCreateInput> = z.object({
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
  day: z.lazy(() => DayCreateNestedManyWithoutWeekInputSchema).optional(),
  block: z.lazy(() => BlockCreateNestedOneWithoutWeekInputSchema).optional()
}).strict();

export default WeekCreateInputSchema;
