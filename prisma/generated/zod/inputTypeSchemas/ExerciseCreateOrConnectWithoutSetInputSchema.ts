import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseCreateWithoutSetInputSchema } from './ExerciseCreateWithoutSetInputSchema';
import { ExerciseUncheckedCreateWithoutSetInputSchema } from './ExerciseUncheckedCreateWithoutSetInputSchema';

export const ExerciseCreateOrConnectWithoutSetInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutSetInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSetInputSchema) ]),
}).strict();

export default ExerciseCreateOrConnectWithoutSetInputSchema;
