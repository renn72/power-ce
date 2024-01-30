import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsCreateWithoutLiftInputSchema } from './LiftsCreateWithoutLiftInputSchema';
import { LiftsUncheckedCreateWithoutLiftInputSchema } from './LiftsUncheckedCreateWithoutLiftInputSchema';
import { LiftsCreateOrConnectWithoutLiftInputSchema } from './LiftsCreateOrConnectWithoutLiftInputSchema';
import { LiftsWhereUniqueInputSchema } from './LiftsWhereUniqueInputSchema';

export const LiftsCreateNestedOneWithoutLiftInputSchema: z.ZodType<Prisma.LiftsCreateNestedOneWithoutLiftInput> = z.object({
  create: z.union([ z.lazy(() => LiftsCreateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedCreateWithoutLiftInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LiftsCreateOrConnectWithoutLiftInputSchema).optional(),
  connect: z.lazy(() => LiftsWhereUniqueInputSchema).optional()
}).strict();

export default LiftsCreateNestedOneWithoutLiftInputSchema;
