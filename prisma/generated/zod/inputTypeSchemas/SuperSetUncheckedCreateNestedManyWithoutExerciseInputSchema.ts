import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetCreateWithoutExerciseInputSchema } from './SuperSetCreateWithoutExerciseInputSchema';
import { SuperSetUncheckedCreateWithoutExerciseInputSchema } from './SuperSetUncheckedCreateWithoutExerciseInputSchema';
import { SuperSetCreateOrConnectWithoutExerciseInputSchema } from './SuperSetCreateOrConnectWithoutExerciseInputSchema';
import { SuperSetCreateManyExerciseInputEnvelopeSchema } from './SuperSetCreateManyExerciseInputEnvelopeSchema';
import { SuperSetWhereUniqueInputSchema } from './SuperSetWhereUniqueInputSchema';

export const SuperSetUncheckedCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.SuperSetUncheckedCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => SuperSetCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetCreateWithoutExerciseInputSchema).array(),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperSetCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => SuperSetCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperSetCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SuperSetWhereUniqueInputSchema),z.lazy(() => SuperSetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default SuperSetUncheckedCreateNestedManyWithoutExerciseInputSchema;
