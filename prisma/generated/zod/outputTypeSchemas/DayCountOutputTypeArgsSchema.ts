import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayCountOutputTypeSelectSchema } from './DayCountOutputTypeSelectSchema';

export const DayCountOutputTypeArgsSchema: z.ZodType<Prisma.DayCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DayCountOutputTypeSelectSchema).nullish(),
}).strict();

export default DayCountOutputTypeSelectSchema;
