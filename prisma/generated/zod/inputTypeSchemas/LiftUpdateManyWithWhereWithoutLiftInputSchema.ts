import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { LiftScalarWhereInputSchema } from './LiftScalarWhereInputSchema';
import { LiftUpdateManyMutationInputSchema } from './LiftUpdateManyMutationInputSchema';
import { LiftUncheckedUpdateManyWithoutLiftInputSchema } from './LiftUncheckedUpdateManyWithoutLiftInputSchema';

export const LiftUpdateManyWithWhereWithoutLiftInputSchema: z.ZodType<Prisma.LiftUpdateManyWithWhereWithoutLiftInput> = z.object({
  where: z.lazy(() => LiftScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LiftUpdateManyMutationInputSchema),z.lazy(() => LiftUncheckedUpdateManyWithoutLiftInputSchema) ]),
}).strict();

export default LiftUpdateManyWithWhereWithoutLiftInputSchema;
