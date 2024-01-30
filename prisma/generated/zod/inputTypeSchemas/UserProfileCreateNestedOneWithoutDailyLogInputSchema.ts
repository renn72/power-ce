import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutDailyLogInputSchema } from './UserProfileCreateWithoutDailyLogInputSchema';
import { UserProfileUncheckedCreateWithoutDailyLogInputSchema } from './UserProfileUncheckedCreateWithoutDailyLogInputSchema';
import { UserProfileCreateOrConnectWithoutDailyLogInputSchema } from './UserProfileCreateOrConnectWithoutDailyLogInputSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';

export const UserProfileCreateNestedOneWithoutDailyLogInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutDailyLogInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutDailyLogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutDailyLogInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export default UserProfileCreateNestedOneWithoutDailyLogInputSchema;
