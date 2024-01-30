import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BlockCreateWithoutWeekInputSchema } from './BlockCreateWithoutWeekInputSchema';
import { BlockUncheckedCreateWithoutWeekInputSchema } from './BlockUncheckedCreateWithoutWeekInputSchema';
import { BlockCreateOrConnectWithoutWeekInputSchema } from './BlockCreateOrConnectWithoutWeekInputSchema';
import { BlockUpsertWithoutWeekInputSchema } from './BlockUpsertWithoutWeekInputSchema';
import { BlockWhereInputSchema } from './BlockWhereInputSchema';
import { BlockWhereUniqueInputSchema } from './BlockWhereUniqueInputSchema';
import { BlockUpdateToOneWithWhereWithoutWeekInputSchema } from './BlockUpdateToOneWithWhereWithoutWeekInputSchema';
import { BlockUpdateWithoutWeekInputSchema } from './BlockUpdateWithoutWeekInputSchema';
import { BlockUncheckedUpdateWithoutWeekInputSchema } from './BlockUncheckedUpdateWithoutWeekInputSchema';

export const BlockUpdateOneWithoutWeekNestedInputSchema: z.ZodType<Prisma.BlockUpdateOneWithoutWeekNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlockCreateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedCreateWithoutWeekInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BlockCreateOrConnectWithoutWeekInputSchema).optional(),
  upsert: z.lazy(() => BlockUpsertWithoutWeekInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BlockWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BlockWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BlockWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BlockUpdateToOneWithWhereWithoutWeekInputSchema),z.lazy(() => BlockUpdateWithoutWeekInputSchema),z.lazy(() => BlockUncheckedUpdateWithoutWeekInputSchema) ]).optional(),
}).strict();

export default BlockUpdateOneWithoutWeekNestedInputSchema;
