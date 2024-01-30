import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseUpdateWithoutSetInputSchema } from './ExerciseUpdateWithoutSetInputSchema';
import { ExerciseUncheckedUpdateWithoutSetInputSchema } from './ExerciseUncheckedUpdateWithoutSetInputSchema';
import { ExerciseCreateWithoutSetInputSchema } from './ExerciseCreateWithoutSetInputSchema';
import { ExerciseUncheckedCreateWithoutSetInputSchema } from './ExerciseUncheckedCreateWithoutSetInputSchema';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';

export const ExerciseUpsertWithoutSetInputSchema: z.ZodType<Prisma.ExerciseUpsertWithoutSetInput> = z.object({
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSetInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSetInputSchema) ]),
  where: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export default ExerciseUpsertWithoutSetInputSchema;
