import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftWhereUniqueInputSchema } from './LiftWhereUniqueInputSchema';
import { LiftUpdateWithoutLiftInputSchema } from './LiftUpdateWithoutLiftInputSchema';
import { LiftUncheckedUpdateWithoutLiftInputSchema } from './LiftUncheckedUpdateWithoutLiftInputSchema';

export const LiftUpdateWithWhereUniqueWithoutLiftInputSchema: z.ZodType<Prisma.LiftUpdateWithWhereUniqueWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LiftUpdateWithoutLiftInputSchema),z.lazy(() => LiftUncheckedUpdateWithoutLiftInputSchema) ]),
}).strict();

export default LiftUpdateWithWhereUniqueWithoutLiftInputSchema;
