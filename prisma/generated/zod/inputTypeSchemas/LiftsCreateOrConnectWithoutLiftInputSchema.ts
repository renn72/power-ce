import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsWhereUniqueInputSchema } from './LiftsWhereUniqueInputSchema';
import { LiftsCreateWithoutLiftInputSchema } from './LiftsCreateWithoutLiftInputSchema';
import { LiftsUncheckedCreateWithoutLiftInputSchema } from './LiftsUncheckedCreateWithoutLiftInputSchema';

export const LiftsCreateOrConnectWithoutLiftInputSchema: z.ZodType<Prisma.LiftsCreateOrConnectWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LiftsCreateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedCreateWithoutLiftInputSchema) ]),
}).strict();

export default LiftsCreateOrConnectWithoutLiftInputSchema;
