import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetWhereUniqueInputSchema } from './SuperSetWhereUniqueInputSchema';
import { SuperSetUpdateWithoutExerciseInputSchema } from './SuperSetUpdateWithoutExerciseInputSchema';
import { SuperSetUncheckedUpdateWithoutExerciseInputSchema } from './SuperSetUncheckedUpdateWithoutExerciseInputSchema';

export const SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema: z.ZodType<Prisma.SuperSetUpdateWithWhereUniqueWithoutExerciseInput> = z.object({
  where: z.lazy(() => SuperSetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SuperSetUpdateWithoutExerciseInputSchema),z.lazy(() => SuperSetUncheckedUpdateWithoutExerciseInputSchema) ]),
}).strict();

export default SuperSetUpdateWithWhereUniqueWithoutExerciseInputSchema;
