import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseUpdateWithoutDayInputSchema } from './ExerciseUpdateWithoutDayInputSchema';
import { ExerciseUncheckedUpdateWithoutDayInputSchema } from './ExerciseUncheckedUpdateWithoutDayInputSchema';

export const ExerciseUpdateWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.ExerciseUpdateWithWhereUniqueWithoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutDayInputSchema) ]),
}).strict();

export default ExerciseUpdateWithWhereUniqueWithoutDayInputSchema;
