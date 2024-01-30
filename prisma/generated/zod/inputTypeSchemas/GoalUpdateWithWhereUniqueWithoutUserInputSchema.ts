import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalWhereUniqueInputSchema } from './GoalWhereUniqueInputSchema';
import { GoalUpdateWithoutUserInputSchema } from './GoalUpdateWithoutUserInputSchema';
import { GoalUncheckedUpdateWithoutUserInputSchema } from './GoalUncheckedUpdateWithoutUserInputSchema';

export const GoalUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutUserInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default GoalUpdateWithWhereUniqueWithoutUserInputSchema;
