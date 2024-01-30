import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockUpdateWithoutWeekInputSchema } from './BlockUpdateWithoutWeekInputSchema';
import { BlockUncheckedUpdateWithoutWeekInputSchema } from './BlockUncheckedUpdateWithoutWeekInputSchema';
import { BlockCreateWithoutWeekInputSchema } from './BlockCreateWithoutWeekInputSchema';
import { BlockUncheckedCreateWithoutWeekInputSchema } from './BlockUncheckedCreateWithoutWeekInputSchema';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';

export const BlockUpsertWithoutWeekInputSchema: z.ZodType<Prisma.BlockUpsertWithoutWeekInput> = z.object({
  update: z.union([ z.lazy(() => BlockUpdateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedUpdateWithoutWeekInputSchema) ]),
  create: z.union([ z.lazy(() => BlockCreateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedCreateWithoutWeekInputSchema) ]),
  where: z.lazy(() => BlockWhereInputSchema).optional()
}).strict();

export default BlockUpsertWithoutWeekInputSchema;
