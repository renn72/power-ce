import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekUpdateWithoutDayInputSchema } from './WeekUpdateWithoutDayInputSchema';
import { WeekUncheckedUpdateWithoutDayInputSchema } from './WeekUncheckedUpdateWithoutDayInputSchema';
import { WeekCreateWithoutDayInputSchema } from './WeekCreateWithoutDayInputSchema';
import { WeekUncheckedCreateWithoutDayInputSchema } from './WeekUncheckedCreateWithoutDayInputSchema';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';

export const WeekUpsertWithoutDayInputSchema: z.ZodType<Prisma.WeekUpsertWithoutDayInput> = z.object({
  update: z.union([ z.lazy(() => WeekUpdateWithoutDayInputSchema),z.lazy(() => WeekUncheckedUpdateWithoutDayInputSchema) ]),
  create: z.union([ z.lazy(() => WeekCreateWithoutDayInputSchema),z.lazy(() => WeekUncheckedCreateWithoutDayInputSchema) ]),
  where: z.lazy(() => WeekWhereInputSchema).optional()
}).strict();

export default WeekUpsertWithoutDayInputSchema;
