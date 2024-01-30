import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayScalarWhereInputSchema } from './DayScalarWhereInputSchema';
import { DayUpdateManyMutationInputSchema } from './DayUpdateManyMutationInputSchema';
import { DayUncheckedUpdateManyWithoutWeekInputSchema } from './DayUncheckedUpdateManyWithoutWeekInputSchema';

export const DayUpdateManyWithWhereWithoutWeekInputSchema: z.ZodType<Prisma.DayUpdateManyWithWhereWithoutWeekInput> = z.object({
  where: z.lazy(() => DayScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DayUpdateManyMutationInputSchema),z.lazy(() => DayUncheckedUpdateManyWithoutWeekInputSchema) ]),
}).strict();

export default DayUpdateManyWithWhereWithoutWeekInputSchema;
