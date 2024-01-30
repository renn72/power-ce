import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayUpdateWithoutWeekInputSchema } from './DayUpdateWithoutWeekInputSchema';
import { DayUncheckedUpdateWithoutWeekInputSchema } from './DayUncheckedUpdateWithoutWeekInputSchema';

export const DayUpdateWithWhereUniqueWithoutWeekInputSchema: z.ZodType<Prisma.DayUpdateWithWhereUniqueWithoutWeekInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DayUpdateWithoutWeekInputSchema),z.lazy(() => DayUncheckedUpdateWithoutWeekInputSchema) ]),
}).strict();

export default DayUpdateWithWhereUniqueWithoutWeekInputSchema;
