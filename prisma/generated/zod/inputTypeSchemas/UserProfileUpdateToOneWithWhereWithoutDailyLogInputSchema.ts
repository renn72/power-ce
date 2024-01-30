import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';
import { UserProfileUpdateWithoutDailyLogInputSchema } from './UserProfileUpdateWithoutDailyLogInputSchema';
import { UserProfileUncheckedUpdateWithoutDailyLogInputSchema } from './UserProfileUncheckedUpdateWithoutDailyLogInputSchema';

export const UserProfileUpdateToOneWithWhereWithoutDailyLogInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutDailyLogInput> = z.object({
  where: z.lazy(() => UserProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutDailyLogInputSchema) ]),
}).strict();

export default UserProfileUpdateToOneWithWhereWithoutDailyLogInputSchema;
