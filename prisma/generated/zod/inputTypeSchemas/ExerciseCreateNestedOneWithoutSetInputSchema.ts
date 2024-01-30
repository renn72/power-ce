import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutSetInputSchema } from './ExerciseCreateWithoutSetInputSchema';
import { ExerciseUncheckedCreateWithoutSetInputSchema } from './ExerciseUncheckedCreateWithoutSetInputSchema';
import { ExerciseCreateOrConnectWithoutSetInputSchema } from './ExerciseCreateOrConnectWithoutSetInputSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';

export const ExerciseCreateNestedOneWithoutSetInputSchema: z.ZodType<Prisma.ExerciseCreateNestedOneWithoutSetInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutSetInputSchema).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional()
}).strict();

export default ExerciseCreateNestedOneWithoutSetInputSchema;
