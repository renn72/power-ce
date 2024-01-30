import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogCreateWithoutUserProfileInputSchema } from './DailyLogCreateWithoutUserProfileInputSchema';
import { DailyLogUncheckedCreateWithoutUserProfileInputSchema } from './DailyLogUncheckedCreateWithoutUserProfileInputSchema';
import { DailyLogCreateOrConnectWithoutUserProfileInputSchema } from './DailyLogCreateOrConnectWithoutUserProfileInputSchema';
import { DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema } from './DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema';
import { DailyLogCreateManyUserProfileInputEnvelopeSchema } from './DailyLogCreateManyUserProfileInputEnvelopeSchema';
import { DailyLogWhereUniqueInputSchema } from './DailyLogWhereUniqueInputSchema';
import { DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema } from './DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema';
import { DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema } from './DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema';
import { DailyLogScalarWhereInputSchema } from './DailyLogScalarWhereInputSchema';

export const DailyLogUncheckedUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.DailyLogUncheckedUpdateManyWithoutUserProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema).array(),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserProfileInputSchema),z.lazy(() => DailyLogCreateOrConnectWithoutUserProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema),z.lazy(() => DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema),z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema),z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema),z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema),z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema),z.lazy(() => DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema),z.lazy(() => DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyLogScalarWhereInputSchema),z.lazy(() => DailyLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default DailyLogUncheckedUpdateManyWithoutUserProfileNestedInputSchema;
