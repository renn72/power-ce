import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SetWhereUniqueInputSchema } from './SetWhereUniqueInputSchema';
import { SetCreateWithoutExerciseInputSchema } from './SetCreateWithoutExerciseInputSchema';
import { SetUncheckedCreateWithoutExerciseInputSchema } from './SetUncheckedCreateWithoutExerciseInputSchema';

export const SetCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.SetCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => SetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SetCreateWithoutExerciseInputSchema),z.lazy(() => SetUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export default SetCreateOrConnectWithoutExerciseInputSchema;
