import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogWhereUniqueInputSchema } from './DailyLogWhereUniqueInputSchema';
import { DailyLogUpdateWithoutUserProfileInputSchema } from './DailyLogUpdateWithoutUserProfileInputSchema';
import { DailyLogUncheckedUpdateWithoutUserProfileInputSchema } from './DailyLogUncheckedUpdateWithoutUserProfileInputSchema';
import { DailyLogCreateWithoutUserProfileInputSchema } from './DailyLogCreateWithoutUserProfileInputSchema';
import { DailyLogUncheckedCreateWithoutUserProfileInputSchema } from './DailyLogUncheckedCreateWithoutUserProfileInputSchema';

export const DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.DailyLogUpsertWithWhereUniqueWithoutUserProfileInput> = z.object({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DailyLogUpdateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedUpdateWithoutUserProfileInputSchema) ]),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema) ]),
}).strict();

export default DailyLogUpsertWithWhereUniqueWithoutUserProfileInputSchema;
