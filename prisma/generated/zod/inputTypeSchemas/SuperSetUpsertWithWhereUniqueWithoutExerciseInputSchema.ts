import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetWhereUniqueInputSchema } from './SuperSetWhereUniqueInputSchema';
import { SuperSetUpdateWithoutExerciseInputSchema } from './SuperSetUpdateWithoutExerciseInputSchema';
import { SuperSetUncheckedUpdateWithoutExerciseInputSchema } from './SuperSetUncheckedUpdateWithoutExerciseInputSchema';
import { SuperSetCreateWithoutExerciseInputSchema } from './SuperSetCreateWithoutExerciseInputSchema';
import { SuperSetUncheckedCreateWithoutExerciseInputSchema } from './SuperSetUncheckedCreateWithoutExerciseInputSchema';

export const SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.SuperSetUpsertWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => SuperSetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SuperSetUpdateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedUpdateWithoutExerciseInputSchema) ]),
  create: z.union([ z.lazy(() => SuperSetCreateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedCreateWithoutExerciseInputSchema) ]),
}).strict();

export default SuperSetUpsertWithWhereUniqueWithoutExerciseInputSchema;
