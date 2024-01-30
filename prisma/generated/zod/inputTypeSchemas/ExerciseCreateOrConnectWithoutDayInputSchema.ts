import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseCreateWithoutDayInputSchema } from './ExerciseCreateWithoutDayInputSchema';
import { ExerciseUncheckedCreateWithoutDayInputSchema } from './ExerciseUncheckedCreateWithoutDayInputSchema';

export const ExerciseCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export default ExerciseCreateOrConnectWithoutDayInputSchema;
