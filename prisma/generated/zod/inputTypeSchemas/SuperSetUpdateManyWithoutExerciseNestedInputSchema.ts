import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetCreateWithoutExerciseInputSchema } from './SuperSetCreateWithoutExerciseInputSchema';
import { SuperSetUncheckedCreateWithoutExerciseInputSchema } from './SuperSetUncheckedCreateWithoutExerciseInputSchema';
import { SuperSetCreateOrConnectWithoutExerciseInputSchema } from './SuperSetCreateOrConnectWithoutExerciseInputSchema';
import { SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema } from './SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema';
import { SuperSetCreateManyExerciseInputEnvelopeSchema } from './SuperSetCreateManyExerciseInputEnvelopeSchema';
import { SuperSetWhereUniqueInputSchema } from './SuperSetWhereUniqueInputSchema';
import { SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema } from './SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema';
import { SuperSetUpdateManyWithWhereWithoutExerciseInputSchema } from './SuperSetUpdateManyWithWhereWithoutExerciseInputSchema';
import { SuperSetScalarWhereInputSchema } from './SuperSetScalarWhereInputSchema';

export const SuperSetUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.SuperSetUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => SuperSetCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetCreateWithoutExerciseInputSchema).array(),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperSetCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => SuperSetCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperSetCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SuperSetWhereUniqueInputSchema),z.lazy(() => SuperSetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SuperSetWhereUniqueInputSchema),z.lazy(() => SuperSetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SuperSetWhereUniqueInputSchema),z.lazy(() => SuperSetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SuperSetWhereUniqueInputSchema),z.lazy(() => SuperSetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SuperSetUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => SuperSetUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SuperSetScalarWhereInputSchema),z.lazy(() => SuperSetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default SuperSetUpdateManyWithoutExerciseNestedInputSchema;
