import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogWhereUniqueInputSchema } from './DailyLogWhereUniqueInputSchema';
import { DailyLogUpdateWithoutUserProfileInputSchema } from './DailyLogUpdateWithoutUserProfileInputSchema';
import { DailyLogUncheckedUpdateWithoutUserProfileInputSchema } from './DailyLogUncheckedUpdateWithoutUserProfileInputSchema';

export const DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.DailyLogUpdateWithWhereUniqueWithoutUserProfileInput> = z.object({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DailyLogUpdateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedUpdateWithoutUserProfileInputSchema) ]),
}).strict();

export default DailyLogUpdateWithWhereUniqueWithoutUserProfileInputSchema;
