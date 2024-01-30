import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { GoalCreateWithoutUserInputSchema } from './GoalCreateWithoutUserInputSchema';
import { GoalUncheckedCreateWithoutUserInputSchema } from './GoalUncheckedCreateWithoutUserInputSchema';
import { GoalCreateOrConnectWithoutUserInputSchema } from './GoalCreateOrConnectWithoutUserInputSchema';
import { GoalUpsertWithWhereUniqueWithoutUserInputSchema } from './GoalUpsertWithWhereUniqueWithoutUserInputSchema';
import { GoalCreateManyUserInputEnvelopeSchema } from './GoalCreateManyUserInputEnvelopeSchema';
import { GoalWhereUniqueInputSchema } from './GoalWhereUniqueInputSchema';
import { GoalUpdateWithWhereUniqueWithoutUserInputSchema } from './GoalUpdateWithWhereUniqueWithoutUserInputSchema';
import { GoalUpdateManyWithWhereWithoutUserInputSchema } from './GoalUpdateManyWithWhereWithoutUserInputSchema';
import { GoalScalarWhereInputSchema } from './GoalScalarWhereInputSchema';

export const GoalUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default GoalUncheckedUpdateManyWithoutUserNestedInputSchema;
