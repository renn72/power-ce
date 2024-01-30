import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateWithoutWeekInputSchema } from './DayCreateWithoutWeekInputSchema';
import { DayUncheckedCreateWithoutWeekInputSchema } from './DayUncheckedCreateWithoutWeekInputSchema';
import { DayCreateOrConnectWithoutWeekInputSchema } from './DayCreateOrConnectWithoutWeekInputSchema';
import { DayUpsertWithWhereUniqueWithoutWeekInputSchema } from './DayUpsertWithWhereUniqueWithoutWeekInputSchema';
import { DayCreateManyWeekInputEnvelopeSchema } from './DayCreateManyWeekInputEnvelopeSchema';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayUpdateWithWhereUniqueWithoutWeekInputSchema } from './DayUpdateWithWhereUniqueWithoutWeekInputSchema';
import { DayUpdateManyWithWhereWithoutWeekInputSchema } from './DayUpdateManyWithWhereWithoutWeekInputSchema';
import { DayScalarWhereInputSchema } from './DayScalarWhereInputSchema';

export const DayUncheckedUpdateManyWithoutWeekNestedInputSchema: z.ZodType<Prisma.DayUncheckedUpdateManyWithoutWeekNestedInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutWeekInputSchema),z.lazy(() => DayCreateWithoutWeekInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema),z.lazy(() => DayUncheckedCreateWithoutWeekInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutWeekInputSchema),z.lazy(() => DayCreateOrConnectWithoutWeekInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DayUpsertWithWhereUniqueWithoutWeekInputSchema),z.lazy(() => DayUpsertWithWhereUniqueWithoutWeekInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyWeekInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DayUpdateWithWhereUniqueWithoutWeekInputSchema),z.lazy(() => DayUpdateWithWhereUniqueWithoutWeekInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DayUpdateManyWithWhereWithoutWeekInputSchema),z.lazy(() => DayUpdateManyWithWhereWithoutWeekInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default DayUncheckedUpdateManyWithoutWeekNestedInputSchema;
