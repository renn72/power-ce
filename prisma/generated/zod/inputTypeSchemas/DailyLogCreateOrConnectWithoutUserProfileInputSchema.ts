import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogWhereUniqueInputSchema } from './DailyLogWhereUniqueInputSchema';
import { DailyLogCreateWithoutUserProfileInputSchema } from './DailyLogCreateWithoutUserProfileInputSchema';
import { DailyLogUncheckedCreateWithoutUserProfileInputSchema } from './DailyLogUncheckedCreateWithoutUserProfileInputSchema';

export const DailyLogCreateOrConnectWithoutUserProfileInputSchema: z.ZodType<Prisma.DailyLogCreateOrConnectWithoutUserProfileInput> = z.object({
  where: z.lazy(() => DailyLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema) ]),
}).strict();

export default DailyLogCreateOrConnectWithoutUserProfileInputSchema;
