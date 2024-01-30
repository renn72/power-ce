import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateWithoutWeekInputSchema } from './DayCreateWithoutWeekInputSchema';
import { DayUncheckedCreateWithoutWeekInputSchema } from './DayUncheckedCreateWithoutWeekInputSchema';
import { DayCreateOrConnectWithoutWeekInputSchema } from './DayCreateOrConnectWithoutWeekInputSchema';
import { DayCreateManyWeekInputEnvelopeSchema } from './DayCreateManyWeekInputEnvelopeSchema';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';

export const DayCreateNestedManyWithoutWeekInputSchema: z.ZodType<Prisma.DayCreateNestedManyWithoutWeekInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutWeekInputSchema),z.lazy(() => DayCreateWithoutWeekInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutWeekInputSchema),z.lazy(() => DayCreateOrConnectWithoutWeekInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyWeekInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default DayCreateNestedManyWithoutWeekInputSchema;
