import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsUpdateWithoutLiftInputSchema } from './LiftsUpdateWithoutLiftInputSchema';
import { LiftsUncheckedUpdateWithoutLiftInputSchema } from './LiftsUncheckedUpdateWithoutLiftInputSchema';
import { LiftsCreateWithoutLiftInputSchema } from './LiftsCreateWithoutLiftInputSchema';
import { LiftsUncheckedCreateWithoutLiftInputSchema } from './LiftsUncheckedCreateWithoutLiftInputSchema';
import { LiftsWhereInputSchema } from './LiftsWhereInputSchema';

export const LiftsUpsertWithoutLiftInputSchema: z.ZodType<Prisma.LiftsUpsertWithoutLiftInput> = z.object({
  update: z.union([ z.lazy(() => LiftsUpdateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedUpdateWithoutLiftInputSchema) ]),
  create: z.union([ z.lazy(() => LiftsCreateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedCreateWithoutLiftInputSchema) ]),
  where: z.lazy(() => LiftsWhereInputSchema).optional()
}).strict();

export default LiftsUpsertWithoutLiftInputSchema;
