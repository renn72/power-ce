import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseUpdateWithoutSsInputSchema } from './ExerciseUpdateWithoutSsInputSchema';
import { ExerciseUncheckedUpdateWithoutSsInputSchema } from './ExerciseUncheckedUpdateWithoutSsInputSchema';
import { ExerciseCreateWithoutSsInputSchema } from './ExerciseCreateWithoutSsInputSchema';
import { ExerciseUncheckedCreateWithoutSsInputSchema } from './ExerciseUncheckedCreateWithoutSsInputSchema';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';

export const ExerciseUpsertWithoutSsInputSchema: z.ZodType<Prisma.ExerciseUpsertWithoutSsInput> = z.object({
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSsInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSsInputSchema) ]),
  where: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export default ExerciseUpsertWithoutSsInputSchema;
