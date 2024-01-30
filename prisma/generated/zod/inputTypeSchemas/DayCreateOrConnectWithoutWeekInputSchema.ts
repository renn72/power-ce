import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayCreateWithoutWeekInputSchema } from './DayCreateWithoutWeekInputSchema';
import { DayUncheckedCreateWithoutWeekInputSchema } from './DayUncheckedCreateWithoutWeekInputSchema';

export const DayCreateOrConnectWithoutWeekInputSchema: z.ZodType<Prisma.DayCreateOrConnectWithoutWeekInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DayCreateWithoutWeekInputSchema),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema) ]),
}).strict();

export default DayCreateOrConnectWithoutWeekInputSchema;
