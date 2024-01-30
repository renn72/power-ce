import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalCreateWithoutUserInputSchema } from './GoalCreateWithoutUserInputSchema';
import { GoalUncheckedCreateWithoutUserInputSchema } from './GoalUncheckedCreateWithoutUserInputSchema';
import { GoalCreateOrConnectWithoutUserInputSchema } from './GoalCreateOrConnectWithoutUserInputSchema';
import { GoalCreateManyUserInputEnvelopeSchema } from './GoalCreateManyUserInputEnvelopeSchema';
import { GoalWhereUniqueInputSchema } from './GoalWhereUniqueInputSchema';

export const GoalCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default GoalCreateNestedManyWithoutUserInputSchema;
