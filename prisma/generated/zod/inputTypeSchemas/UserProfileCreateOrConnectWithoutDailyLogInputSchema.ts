import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileCreateWithoutDailyLogInputSchema } from './UserProfileCreateWithoutDailyLogInputSchema';
import { UserProfileUncheckedCreateWithoutDailyLogInputSchema } from './UserProfileUncheckedCreateWithoutDailyLogInputSchema';

export const UserProfileCreateOrConnectWithoutDailyLogInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutDailyLogInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutDailyLogInputSchema) ]),
}).strict();

export default UserProfileCreateOrConnectWithoutDailyLogInputSchema;
