import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftWhereUniqueInputSchema } from './LiftWhereUniqueInputSchema';
import { LiftCreateWithoutLiftInputSchema } from './LiftCreateWithoutLiftInputSchema';
import { LiftUncheckedCreateWithoutLiftInputSchema } from './LiftUncheckedCreateWithoutLiftInputSchema';

export const LiftCreateOrConnectWithoutLiftInputSchema: z.ZodType<Prisma.LiftCreateOrConnectWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LiftCreateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema) ]),
}).strict();

export default LiftCreateOrConnectWithoutLiftInputSchema;
