import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutSsInputSchema } from './ExerciseCreateWithoutSsInputSchema';
import { ExerciseUncheckedCreateWithoutSsInputSchema } from './ExerciseUncheckedCreateWithoutSsInputSchema';
import { ExerciseCreateOrConnectWithoutSsInputSchema } from './ExerciseCreateOrConnectWithoutSsInputSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';

export const ExerciseCreateNestedOneWithoutSsInputSchema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutSsInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutSsInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional()
}).strict();

export default ExerciseCreateNestedOneWithoutSsInputSchema;
