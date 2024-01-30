import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutDayInputSchema } from './ExerciseCreateWithoutDayInputSchema';
import { ExerciseUncheckedCreateWithoutDayInputSchema } from './ExerciseUncheckedCreateWithoutDayInputSchema';
import { ExerciseCreateOrConnectWithoutDayInputSchema } from './ExerciseCreateOrConnectWithoutDayInputSchema';
import { ExerciseUpsertWithWhereUniqueWithoutDayInputSchema } from './ExerciseUpsertWithWhereUniqueWithoutDayInputSchema';
import { ExerciseCreateManyDayInputEnvelopeSchema } from './ExerciseCreateManyDayInputEnvelopeSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseUpdateWithWhereUniqueWithoutDayInputSchema } from './ExerciseUpdateWithWhereUniqueWithoutDayInputSchema';
import { ExerciseUpdateManyWithWhereWithoutDayInputSchema } from './ExerciseUpdateManyWithWhereWithoutDayInputSchema';
import { ExerciseScalarWhereInputSchema } from './ExerciseScalarWhereInputSchema';

export const ExerciseUncheckedUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutDayInputSchema),z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutDayInputSchema),z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExerciseUpdateManyWithWhereWithoutDayInputSchema),z.lazy(() => ExerciseUpdateManyWithWhereWithoutDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ExerciseUncheckedUpdateManyWithoutDayNestedInputSchema;
