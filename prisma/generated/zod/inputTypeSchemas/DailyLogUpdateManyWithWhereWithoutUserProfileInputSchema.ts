import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogScalarWhereInputSchema } from './DailyLogScalarWhereInputSchema';
import { DailyLogUpdateManyMutationInputSchema } from './DailyLogUpdateManyMutationInputSchema';
import { DailyLogUncheckedUpdateManyWithoutUserProfileInputSchema } from './DailyLogUncheckedUpdateManyWithoutUserProfileInputSchema';

export const DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema: z.ZodType<Prisma.DailyLogUpdateManyWithWhereWithoutUserProfileInput> = z.object({
  where: z.lazy(() => DailyLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateManyMutationInputSchema),z.lazy(() => DailyLogUncheckedUpdateManyWithoutUserProfileInputSchema) ]),
}).strict();

export default DailyLogUpdateManyWithWhereWithoutUserProfileInputSchema;
