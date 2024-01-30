import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';
import { ExerciseUpdateWithoutSsInputSchema } from './ExerciseUpdateWithoutSsInputSchema';
import { ExerciseUncheckedUpdateWithoutSsInputSchema } from './ExerciseUncheckedUpdateWithoutSsInputSchema';

export const ExerciseUpdateToOneWithWhereWithoutSsInputSchema: z.ZodType<Prisma.ExerciseUpdateToOneWithWhereWithoutSsInput> = z.object({
  where: z.lazy(() => ExerciseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSsInputSchema) ]),
}).strict();

export default ExerciseUpdateToOneWithWhereWithoutSsInputSchema;
