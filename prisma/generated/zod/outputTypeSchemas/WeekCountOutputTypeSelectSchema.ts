import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const WeekCountOutputTypeSelectSchema: z.ZodType<Prisma.WeekCountOutputTypeSelect> = z.object({
  day: z.boolean().optional(),
}).strict();

export default WeekCountOutputTypeSelectSchema;
