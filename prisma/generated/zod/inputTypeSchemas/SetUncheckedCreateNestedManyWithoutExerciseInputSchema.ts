import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetCreateWithoutExerciseInputSchema } from './SetCreateWithoutExerciseInputSchema';
import { SetUncheckedCreateWithoutExerciseInputSchema } from './SetUncheckedCreateWithoutExerciseInputSchema';
import { SetCreateOrConnectWithoutExerciseInputSchema } from './SetCreateOrConnectWithoutExerciseInputSchema';
import { SetCreateManyExerciseInputEnvelopeSchema } from './SetCreateManyExerciseInputEnvelopeSchema';
import { SetWhereUniqueInputSchema } from './SetWhereUniqueInputSchema';

export const SetUncheckedCreateNestedManyWithoutExerciseInputSchema: z.ZodType<Prisma.SetUncheckedCreateNestedManyWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => SetCreateWithoutExerciseInputSchema),z.lazy(() => SetCreateWithoutExerciseInputSchema).array(),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SetCreateOrConnectWithoutExerciseInputSchema),z.lazy(() => SetCreateOrConnectWithoutExerciseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SetCreateManyExerciseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SetWhereUniqueInputSchema),z.lazy(() => SetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default SetUncheckedCreateNestedManyWithoutExerciseInputSchema;
