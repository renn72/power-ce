import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftCreateWithoutLiftInputSchema } from './LiftCreateWithoutLiftInputSchema';
import { LiftUncheckedCreateWithoutLiftInputSchema } from './LiftUncheckedCreateWithoutLiftInputSchema';
import { LiftCreateOrConnectWithoutLiftInputSchema } from './LiftCreateOrConnectWithoutLiftInputSchema';
import { LiftUpsertWithWhereUniqueWithoutLiftInputSchema } from './LiftUpsertWithWhereUniqueWithoutLiftInputSchema';
import { LiftCreateManyLiftInputEnvelopeSchema } from './LiftCreateManyLiftInputEnvelopeSchema';
import { LiftWhereUniqueInputSchema } from './LiftWhereUniqueInputSchema';
import { LiftUpdateWithWhereUniqueWithoutLiftInputSchema } from './LiftUpdateWithWhereUniqueWithoutLiftInputSchema';
import { LiftUpdateManyWithWhereWithoutLiftInputSchema } from './LiftUpdateManyWithWhereWithoutLiftInputSchema';
import { LiftScalarWhereInputSchema } from './LiftScalarWhereInputSchema';

export const LiftUpdateManyWithoutLiftNestedInputSchema: z.ZodType<Prisma.LiftUpdateManyWithoutLiftNestedInput> = z.object({
  create: z.union([ z.lazy(() => LiftCreateWithoutLiftInputSchema),z.lazy(() => LiftCreateWithoutLiftInputSchema).array(),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LiftCreateOrConnectWithoutLiftInputSchema),z.lazy(() => LiftCreateOrConnectWithoutLiftInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LiftUpsertWithWhereUniqueWithoutLiftInputSchema),z.lazy(() => LiftUpsertWithWhereUniqueWithoutLiftInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LiftCreateManyLiftInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LiftWhereUniqueInputSchema),z.lazy(() => LiftWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LiftWhereUniqueInputSchema),z.lazy(() => LiftWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LiftWhereUniqueInputSchema),z.lazy(() => LiftWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LiftWhereUniqueInputSchema),z.lazy(() => LiftWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LiftUpdateWithWhereUniqueWithoutLiftInputSchema),z.lazy(() => LiftUpdateWithWhereUniqueWithoutLiftInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LiftUpdateManyWithWhereWithoutLiftInputSchema),z.lazy(() => LiftUpdateManyWithWhereWithoutLiftInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LiftScalarWhereInputSchema),z.lazy(() => LiftScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default LiftUpdateManyWithoutLiftNestedInputSchema;
