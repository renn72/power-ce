import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateWithoutExerciseInputSchema } from './DayCreateWithoutExerciseInputSchema';
import { DayUncheckedCreateWithoutExerciseInputSchema } from './DayUncheckedCreateWithoutExerciseInputSchema';
import { DayCreateOrConnectWithoutExerciseInputSchema } from './DayCreateOrConnectWithoutExerciseInputSchema';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';

export const DayCreateNestedOneWithoutExerciseInputSchema: z.ZodType<Prisma.DayCreateNestedOneWithoutExerciseInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedCreateWithoutExerciseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DayCreateOrConnectWithoutExerciseInputSchema).optional(),
  connect: z.lazy(() => DayWhereUniqueInputSchema).optional()
}).strict();

export default DayCreateNestedOneWithoutExerciseInputSchema;
