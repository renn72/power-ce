import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WeekCountOutputTypeSelectSchema } from './WeekCountOutputTypeSelectSchema';

export const WeekCountOutputTypeArgsSchema: z.ZodType<Prisma.WeekCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WeekCountOutputTypeSelectSchema).nullish(),
}).strict();

export default WeekCountOutputTypeSelectSchema;
