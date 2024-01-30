import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';
import { BlockUpdateWithoutWeekInputSchema } from './BlockUpdateWithoutWeekInputSchema';
import { BlockUncheckedUpdateWithoutWeekInputSchema } from './BlockUncheckedUpdateWithoutWeekInputSchema';

export const BlockUpdateToOneWithWhereWithoutWeekInputSchema: z.ZodType<Prisma.BlockUpdateToOneWithWhereWithoutWeekInput> = z.object({
  where: z.lazy(() => BlockWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BlockUpdateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedUpdateWithoutWeekInputSchema) ]),
}).strict();

export default BlockUpdateToOneWithWhereWithoutWeekInputSchema;
