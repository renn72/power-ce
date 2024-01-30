import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftsCreateWithoutLiftInputSchema } from './LiftsCreateWithoutLiftInputSchema';
import { LiftsUncheckedCreateWithoutLiftInputSchema } from './LiftsUncheckedCreateWithoutLiftInputSchema';
import { LiftsCreateOrConnectWithoutLiftInputSchema } from './LiftsCreateOrConnectWithoutLiftInputSchema';
import { LiftsUpsertWithoutLiftInputSchema } from './LiftsUpsertWithoutLiftInputSchema';
import { LiftsWhereUniqueInputSchema } from './LiftsWhereUniqueInputSchema';
import { LiftsUpdateToOneWithWhereWithoutLiftInputSchema } from './LiftsUpdateToOneWithWhereWithoutLiftInputSchema';
import { LiftsUpdateWithoutLiftInputSchema } from './LiftsUpdateWithoutLiftInputSchema';
import { LiftsUncheckedUpdateWithoutLiftInputSchema } from './LiftsUncheckedUpdateWithoutLiftInputSchema';

export const LiftsUpdateOneRequiredWithoutLiftNestedInputSchema: z.ZodType<Prisma.LiftsUpdateOneRequiredWithoutLiftNestedInput> = z.object({
  create: z.union([ z.lazy(() => LiftsCreateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedCreateWithoutLiftInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LiftsCreateOrConnectWithoutLiftInputSchema).optional(),
  upsert: z.lazy(() => LiftsUpsertWithoutLiftInputSchema).optional(),
  connect: z.lazy(() => LiftsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LiftsUpdateToOneWithWhereWithoutLiftInputSchema),z.lazy(() => LiftsUpdateWithoutLiftInputSchema),z.lazy(() => LiftsUncheckedUpdateWithoutLiftInputSchema) ]).optional(),
}).strict();

export default LiftsUpdateOneRequiredWithoutLiftNestedInputSchema;
