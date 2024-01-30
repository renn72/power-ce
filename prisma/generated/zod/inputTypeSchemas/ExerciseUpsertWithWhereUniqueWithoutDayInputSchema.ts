import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseUpdateWithoutDayInputSchema } from './ExerciseUpdateWithoutDayInputSchema';
import { ExerciseUncheckedUpdateWithoutDayInputSchema } from './ExerciseUncheckedUpdateWithoutDayInputSchema';
import { ExerciseCreateWithoutDayInputSchema } from './ExerciseCreateWithoutDayInputSchema';
import { ExerciseUncheckedCreateWithoutDayInputSchema } from './ExerciseUncheckedCreateWithoutDayInputSchema';

export const ExerciseUpsertWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.ExerciseUpsertWithWhereUniqueWithoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutDayInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export default ExerciseUpsertWithWhereUniqueWithoutDayInputSchema;
