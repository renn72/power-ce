import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsWhereInputSchema } from './LiftsWhereInputSchema';
import { LiftsUpdateWithoutLiftInputSchema } from './LiftsUpdateWithoutLiftInputSchema';
import { LiftsUncheckedUpdateWithoutLiftInputSchema } from './LiftsUncheckedUpdateWithoutLiftInputSchema';

export const LiftsUpdateToOneWithWhereWithoutLiftInputSchema: z.ZodType<Prisma.LiftsUpdateToOneWithWhereWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LiftsUpdateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedUpdateWithoutLiftInputSchema) ]),
}).strict();

export default LiftsUpdateToOneWithWhereWithoutLiftInputSchema;
