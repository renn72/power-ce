import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetWhereUniqueInputSchema } from './SetWhereUniqueInputSchema';
import { SetUpdateWithoutExerciseInputSchema } from './SetUpdateWithoutExerciseInputSchema';
import { SetUncheckedUpdateWithoutExerciseInputSchema } from './SetUncheckedUpdateWithoutExerciseInputSchema';

export const SetUpdateWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.SetUpdateWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => SetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SetUpdateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export default SetUpdateWithWhereUniqueWithoutExerciseInputSchema;
