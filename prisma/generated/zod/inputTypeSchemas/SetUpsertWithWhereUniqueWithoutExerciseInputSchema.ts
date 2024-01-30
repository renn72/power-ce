import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetWhereUniqueInputSchema } from './SetWhereUniqueInputSchema';
import { SetUpdateWithoutExerciseInputSchema } from './SetUpdateWithoutExerciseInputSchema';
import { SetUncheckedUpdateWithoutExerciseInputSchema } from './SetUncheckedUpdateWithoutExerciseInputSchema';
import { SetCreateWithoutExerciseInputSchema } from './SetCreateWithoutExerciseInputSchema';
import { SetUncheckedCreateWithoutExerciseInputSchema } from './SetUncheckedCreateWithoutExerciseInputSchema';

export const SetUpsertWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.SetUpsertWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => SetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SetUpdateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => SetCreateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export default SetUpsertWithWhereUniqueWithoutExerciseInputSchema;
