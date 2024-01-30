import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';
import { WeekUpdateWithoutDayInputSchema } from './WeekUpdateWithoutDayInputSchema';
import { WeekUncheckedUpdateWithoutDayInputSchema } from './WeekUncheckedUpdateWithoutDayInputSchema';

export const WeekUpdateToOneWithWhereWithoutDayInputSchema: z.ZodType<Prisma.WeekUpdateToOneWithWhereWithoutDayInput> = z.object({
  where: z.lazy(() => WeekWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WeekUpdateWithoutDayInputSchema),z.lazy(() => WeekUncheckedUpdateWithoutDayInputSchema) ]),
}).strict();

export default WeekUpdateToOneWithWhereWithoutDayInputSchema;
