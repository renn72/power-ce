import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftWhereUniqueInputSchema } from './LiftWhereUniqueInputSchema';
import { LiftUpdateWithoutLiftInputSchema } from './LiftUpdateWithoutLiftInputSchema';
import { LiftUncheckedUpdateWithoutLiftInputSchema } from './LiftUncheckedUpdateWithoutLiftInputSchema';
import { LiftCreateWithoutLiftInputSchema } from './LiftCreateWithoutLiftInputSchema';
import { LiftUncheckedCreateWithoutLiftInputSchema } from './LiftUncheckedCreateWithoutLiftInputSchema';

export const LiftUpsertWithWhereUniqueWithoutLiftInputSchema: z.ZodType<Prisma.LiftUpsertWithWhereUniqueWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LiftUpdateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedUpdateWithoutLiftInputSchema) ]),
  create: z.union([ z.lazy(() => LiftCreateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedCreateWithoutLiftInputSchema) ]),
}).strict();

export default LiftUpsertWithWhereUniqueWithoutLiftInputSchema;
