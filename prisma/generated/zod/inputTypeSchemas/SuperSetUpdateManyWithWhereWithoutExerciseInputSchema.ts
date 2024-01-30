import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SuperSetScalarWhereInputSchema } from './SuperSetScalarWhereInputSchema';
import { SuperSetUpdateManyMutationInputSchema } from './SuperSetUpdateManyMutationInputSchema';
import { SuperSetUncheckedUpdateManyWithoutExerciseInputSchema } from './SuperSetUncheckedUpdateManyWithoutExerciseInputSchema';

export const SuperSetUpdateManyWithWhereWithoutExerciseInputSchema: z.ZodType<Prisma.SuperSetUpdateManyWithWhereWithoutExerciseInput> = z.object({
  where: z.lazy(() => SuperSetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SuperSetUpdateManyMutationInputSchema),z.lazy(() => SuperSetUncheckedUpdateManyWithoutExerciseInputSchema) ]),
}).strict();

export default SuperSetUpdateManyWithWhereWithoutExerciseInputSchema;
