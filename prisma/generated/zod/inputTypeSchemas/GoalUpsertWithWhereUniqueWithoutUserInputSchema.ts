import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalWhereUniqueInputSchema } from './GoalWhereUniqueInputSchema';
import { GoalUpdateWithoutUserInputSchema } from './GoalUpdateWithoutUserInputSchema';
import { GoalUncheckedUpdateWithoutUserInputSchema } from './GoalUncheckedUpdateWithoutUserInputSchema';
import { GoalCreateWithoutUserInputSchema } from './GoalCreateWithoutUserInputSchema';
import { GoalUncheckedCreateWithoutUserInputSchema } from './GoalUncheckedCreateWithoutUserInputSchema';

export const GoalUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutUserInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default GoalUpsertWithWhereUniqueWithoutUserInputSchema;
