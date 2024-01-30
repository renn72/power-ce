import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayUpdateWithoutWeekInputSchema } from './DayUpdateWithoutWeekInputSchema';
import { DayUncheckedUpdateWithoutWeekInputSchema } from './DayUncheckedUpdateWithoutWeekInputSchema';
import { DayCreateWithoutWeekInputSchema } from './DayCreateWithoutWeekInputSchema';
import { DayUncheckedCreateWithoutWeekInputSchema } from './DayUncheckedCreateWithoutWeekInputSchema';

export const DayUpsertWithWhereUniqueWithoutWeekInputSchema: z.ZodType<Prisma.DayUpsertWithWhereUniqueWithoutWeekInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DayUpdateWithoutWeekInputSchema),z.lazy(() => DayUncheckedUpdateWithoutWeekInputSchema) ]),
  create: z.union([ z.lazy(() => DayCreateWithoutWeekInputSchema),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema) ]),
}).strict();

export default DayUpsertWithWhereUniqueWithoutWeekInputSchema;
