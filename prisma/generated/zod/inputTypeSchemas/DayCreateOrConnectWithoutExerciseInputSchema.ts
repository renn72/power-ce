import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayCreateWithoutExerciseInputSchema } from './DayCreateWithoutExerciseInputSchema';
import { DayUncheckedCreateWithoutExerciseInputSchema } from './DayUncheckedCreateWithoutExerciseInputSchema';

export const DayCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.DayCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DayCreateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export default DayCreateOrConnectWithoutExerciseInputSchema;
