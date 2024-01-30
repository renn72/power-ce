import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockWhereUniqueInputSchema } from './BlockWhereUniqueInputSchema';
import { BlockCreateWithoutWeekInputSchema } from './BlockCreateWithoutWeekInputSchema';
import { BlockUncheckedCreateWithoutWeekInputSchema } from './BlockUncheckedCreateWithoutWeekInputSchema';

export const BlockCreateOrConnectWithoutWeekInputSchema: z.ZodType<Prisma.BlockCreateOrConnectWithoutWeekInput> = z.object({
  where: z.lazy(() => BlockWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlockCreateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedCreateWithoutWeekInputSchema) ]),
}).strict();

export default BlockCreateOrConnectWithoutWeekInputSchema;
