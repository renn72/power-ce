import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DailyLogCreateWithoutUserProfileInputSchema } from './DailyLogCreateWithoutUserProfileInputSchema';
import { DailyLogUncheckedCreateWithoutUserProfileInputSchema } from './DailyLogUncheckedCreateWithoutUserProfileInputSchema';
import { DailyLogCreateOrConnectWithoutUserProfileInputSchema } from './DailyLogCreateOrConnectWithoutUserProfileInputSchema';
import { DailyLogCreateManyUserProfileInputEnvelopeSchema } from './DailyLogCreateManyUserProfileInputEnvelopeSchema';
import { DailyLogWhereUniqueInputSchema } from './DailyLogWhereUniqueInputSchema';

export const DailyLogUncheckedCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.DailyLogUncheckedCreateNestedManyWithoutUserProfileInput> = z.object({
  create: z.union([ z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogCreateWithoutUserProfileInputSchema).array(),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema),z.lazy(() => DailyLogUncheckedCreateWithoutUserProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyLogCreateOrConnectWithoutUserProfileInputSchema),z.lazy(() => DailyLogCreateOrConnectWithoutUserProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyLogCreateManyUserProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyLogWhereUniqueInputSchema),z.lazy(() => DailyLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default DailyLogUncheckedCreateNestedManyWithoutUserProfileInputSchema;
