import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetCreateWithoutExerciseInputSchema } from './SetCreateWithoutExerciseInputSchema';
import { SetUncheckedCreateWithoutExerciseInputSchema } from './SetUncheckedCreateWithoutExerciseInputSchema';
import { SetCreateOrConnectWithoutExerciseInputSchema } from './SetCreateOrConnectWithoutExerciseInputSchema';
import { SetUpsertWithWhereUniqueWithoutExerciseInputSchema } from './SetUpsertWithWhereUniqueWithoutExerciseInputSchema';
import { SetCreateManyExerciseInputEnvelopeSchema } from './SetCreateManyExerciseInputEnvelopeSchema';
import { SetWhereUniqueInputSchema } from './SetWhereUniqueInputSchema';
import { SetUpdateWithWhereUniqueWithoutExerciseInputSchema } from './SetUpdateWithWhereUniqueWithoutExerciseInputSchema';
import { SetUpdateManyWithWhereWithoutExerciseInputSchema } from './SetUpdateManyWithWhereWithoutExerciseInputSchema';
import { SetScalarWhereInputSchema } from './SetScalarWhereInputSchema';

export const SetUncheckedUpdateManyWithoutExerciseNestedInputSchema: z.ZodType<Prisma.SetUncheckedUpdateManyWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => SetCreateWithoutExerciseInputSchema),z.lazy(() => SetCreateWithoutExerciseInputSchema).array(),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SetCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => SetCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SetUpsertWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => SetUpsertWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SetCreateManyExerciseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SetWhereUniqueInputSchema),z.lazy(() => SetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SetWhereUniqueInputSchema),z.lazy(() => SetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SetWhereUniqueInputSchema),z.lazy(() => SetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SetWhereUniqueInputSchema),z.lazy(() => SetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SetUpdateWithWhereUniqueWithoutExerciseInputSchema),z.lazy(() => SetUpdateWithWhereUniqueWithoutExerciseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SetUpdateManyWithWhereWithoutExerciseInputSchema),z.lazy(() => SetUpdateManyWithWhereWithoutExerciseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SetScalarWhereInputSchema),z.lazy(() => SetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default SetUncheckedUpdateManyWithoutExerciseNestedInputSchema;
