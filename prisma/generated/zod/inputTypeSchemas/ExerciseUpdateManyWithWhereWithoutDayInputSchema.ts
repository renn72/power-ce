import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseScalarWhereInputSchema } from './ExerciseScalarWhereInputSchema';
import { ExerciseUpdateManyMutationInputSchema } from './ExerciseUpdateManyMutationInputSchema';
import { ExerciseUncheckedUpdateManyWithoutDayInputSchema } from './ExerciseUncheckedUpdateManyWithoutDayInputSchema';

export const ExerciseUpdateManyWithWhereWithoutDayInputSchema: z.ZodType<Prisma.ExerciseUpdateManyWithWhereWithoutDayInput> = z.object({
  where: z.lazy(() => ExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateManyMutationInputSchema),z.lazy(() => ExerciseUncheckedUpdateManyWithoutDayInputSchema) ]),
}).strict();

export default ExerciseUpdateManyWithWhereWithoutDayInputSchema;
