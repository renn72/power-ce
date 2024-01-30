import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockCreateWithoutWeekInputSchema } from './BlockCreateWithoutWeekInputSchema';
import { BlockUncheckedCreateWithoutWeekInputSchema } from './BlockUncheckedCreateWithoutWeekInputSchema';
import { BlockCreateOrConnectWithoutWeekInputSchema } from './BlockCreateOrConnectWithoutWeekInputSchema';
import { BlockWhereUniqueInputSchema } from './BlockWhereUniqueInputSchema';

export const BlockCreateNestedOneWithoutWeekInputSchema: z.ZodType<Prisma.BlockCreateNestedOneWithoutWeekInput> = z.object({
  create: z.union([ z.lazy(() => BlockCreateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedCreateWithoutWeekInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlockCreateOrConnectWithoutWeekInputSchema).optional(),
  connect: z.lazy(() => BlockWhereUniqueInputSchema).optional()
}).strict();

export default BlockCreateNestedOneWithoutWeekInputSchema;
