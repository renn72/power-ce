import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileUpdateWithoutDailyLogInputSchema } from './UserProfileUpdateWithoutDailyLogInputSchema';
import { UserProfileUncheckedUpdateWithoutDailyLogInputSchema } from './UserProfileUncheckedUpdateWithoutDailyLogInputSchema';
import { UserProfileCreateWithoutDailyLogInputSchema } from './UserProfileCreateWithoutDailyLogInputSchema';
import { UserProfileUncheckedCreateWithoutDailyLogInputSchema } from './UserProfileUncheckedCreateWithoutDailyLogInputSchema';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const UserProfileUpsertWithoutDailyLogInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutDailyLogInput> = z.object({
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutDailyLogInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutDailyLogInputSchema) ]),
  where: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export default UserProfileUpsertWithoutDailyLogInputSchema;
