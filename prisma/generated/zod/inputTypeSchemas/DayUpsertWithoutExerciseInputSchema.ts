import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayUpdateWithoutExerciseInputSchema } from './DayUpdateWithoutExerciseInputSchema';
import { DayUncheckedUpdateWithoutExerciseInputSchema } from './DayUncheckedUpdateWithoutExerciseInputSchema';
import { DayCreateWithoutExerciseInputSchema } from './DayCreateWithoutExerciseInputSchema';
import { DayUncheckedCreateWithoutExerciseInputSchema } from './DayUncheckedCreateWithoutExerciseInputSchema';
import { DayWhereInputSchema } from './DayWhereInputSchema';

export const DayUpsertWithoutExerciseInputSchema: z.ZodType<Prisma.DayUpsertWithoutExerciseInput> = z.object({
  update: z.union([ z.lazy(() => DayUpdateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => DayCreateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedCreateWithoutExerciseInputSchema) ]),
  where: z.lazy(() => DayWhereInputSchema).optional()
}).strict();

export default DayUpsertWithoutExerciseInputSchema;
