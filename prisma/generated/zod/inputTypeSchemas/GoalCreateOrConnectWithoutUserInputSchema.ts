import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalWhereUniqueInputSchema } from './GoalWhereUniqueInputSchema';
import { GoalCreateWithoutUserInputSchema } from './GoalCreateWithoutUserInputSchema';
import { GoalUncheckedCreateWithoutUserInputSchema } from './GoalUncheckedCreateWithoutUserInputSchema';

export const GoalCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default GoalCreateOrConnectWithoutUserInputSchema;
