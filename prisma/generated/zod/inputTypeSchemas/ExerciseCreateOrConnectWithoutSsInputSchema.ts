import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseCreateWithoutSsInputSchema } from './ExerciseCreateWithoutSsInputSchema';
import { ExerciseUncheckedCreateWithoutSsInputSchema } from './ExerciseUncheckedCreateWithoutSsInputSchema';

export const ExerciseCreateOrConnectWithoutSsInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutSsInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSsInputSchema) ]),
}).strict();

export default ExerciseCreateOrConnectWithoutSsInputSchema;
