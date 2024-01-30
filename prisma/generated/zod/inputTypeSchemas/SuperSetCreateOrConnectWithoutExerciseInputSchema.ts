import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetWhereUniqueInputSchema } from './SuperSetWhereUniqueInputSchema';
import { SuperSetCreateWithoutExerciseInputSchema } from './SuperSetCreateWithoutExerciseInputSchema';
import { SuperSetUncheckedCreateWithoutExerciseInputSchema } from './SuperSetUncheckedCreateWithoutExerciseInputSchema';

export const SuperSetCreateOrConnectWithoutExerciseInputSchema: z.ZodType<Prisma.SuperSetCreateOrConnectWithoutExerciseInput> = z.object({
  where: z.lazy(() => SuperSetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SuperSetCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export default SuperSetCreateOrConnectWithoutExerciseInputSchema;
