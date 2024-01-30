import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';
import { ExerciseUpdateWithoutSetInputSchema } from './ExerciseUpdateWithoutSetInputSchema';
import { ExerciseUncheckedUpdateWithoutSetInputSchema } from './ExerciseUncheckedUpdateWithoutSetInputSchema';

export const ExerciseUpdateToOneWithWhereWithoutSetInputSchema: z.ZodType<Prisma.ExerciseUpdateToOneWithWhereWithoutSetInput> = z.object({
  where: z.lazy(() => ExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSetInputSchema) ]),
}).strict();

export default ExerciseUpdateToOneWithWhereWithoutSetInputSchema;
