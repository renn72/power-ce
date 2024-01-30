import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalScalarWhereInputSchema } from './GoalScalarWhereInputSchema';
import { GoalUpdateManyMutationInputSchema } from './GoalUpdateManyMutationInputSchema';
import { GoalUncheckedUpdateManyWithoutUserInputSchema } from './GoalUncheckedUpdateManyWithoutUserInputSchema';

export const GoalUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default GoalUpdateManyWithWhereWithoutUserInputSchema;
