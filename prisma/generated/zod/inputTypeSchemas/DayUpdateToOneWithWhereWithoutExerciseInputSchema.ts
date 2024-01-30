import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayWhereInputSchema } from './DayWhereInputSchema';
import { DayUpdateWithoutExerciseInputSchema } from './DayUpdateWithoutExerciseInputSchema';
import { DayUncheckedUpdateWithoutExerciseInputSchema } from './DayUncheckedUpdateWithoutExerciseInputSchema';

export const DayUpdateToOneWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.DayUpdateToOneWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => DayWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DayUpdateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export default DayUpdateToOneWithWhereWithoutExerciseInputSchema;
