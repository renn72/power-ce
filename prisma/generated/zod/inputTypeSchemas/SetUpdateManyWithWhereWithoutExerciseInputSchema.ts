import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetScalarWhereInputSchema } from './SetScalarWhereInputSchema';
import { SetUpdateManyMutationInputSchema } from './SetUpdateManyMutationInputSchema';
import { SetUncheckedUpdateManyWithoutExerciseInputSchema } from './SetUncheckedUpdateManyWithoutExerciseInputSchema';

export const SetUpdateManyWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.SetUpdateManyWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => SetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SetUpdateManyMutationInputSchema),z.lazy(() => SetUncheckedUpdateManyWithoutExerciseInputSchema) ]),
}).strict();

export default SetUpdateManyWithWhereWithoutExerciseInputSchema;
