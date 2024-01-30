import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const DayCountOutputTypeSelectSchema: z.ZodType<Prisma.DayCountOutputTypeSelect> = z.object({
  exercise: z.boolean().optional(),
}).strict();

export default DayCountOutputTypeSelectSchema;
