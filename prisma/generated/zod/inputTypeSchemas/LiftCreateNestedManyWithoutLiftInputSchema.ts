import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftCreateWithoutLiftInputSchema } from './LiftCreateWithoutLiftInputSchema';
import { LiftUncheckedCreateWithoutLiftInputSchema } from './LiftUncheckedCreateWithoutLiftInputSchema';
import { LiftCreateOrConnectWithoutLiftInputSchema } from './LiftCreateOrConnectWithoutLiftInputSchema';
import { LiftCreateManyLiftInputEnvelopeSchema } from './LiftCreateManyLiftInputEnvelopeSchema';
import { LiftWhereUniqueInputSchema } from './LiftWhereUniqueInputSchema';

export const LiftCreateNestedManyWithoutLiftInputSchema: z.ZodType<Prisma.LiftCreateNestedManyWithoutLiftInput> = z.object({
  create: z.union([ z.lazy(() => LiftCreateWithoutLiftInputSchema),z.lazy(() => LiftCreateWithoutLiftInputSchema).array(),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LiftCreateOrConnectWithoutLiftInputSchema),z.lazy(() => LiftCreateOrConnectWithoutLiftInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LiftCreateManyLiftInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LiftWhereUniqueInputSchema),z.lazy(() => LiftWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default LiftCreateNestedManyWithoutLiftInputSchema;
