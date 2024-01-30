import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutDailyLogInputSchema } from './UserProfileCreateWithoutDailyLogInputSchema';
import { UserProfileUncheckedCreateWithoutDailyLogInputSchema } from './UserProfileUncheckedCreateWithoutDailyLogInputSchema';
import { UserProfileCreateOrConnectWithoutDailyLogInputSchema } from './UserProfileCreateOrConnectWithoutDailyLogInputSchema';
import { UserProfileUpsertWithoutDailyLogInputSchema } from './UserProfileUpsertWithoutDailyLogInputSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileUpdateToOneWithWhereWithoutDailyLogInputSchema } from './UserProfileUpdateToOneWithWhereWithoutDailyLogInputSchema';
import { UserProfileUpdateWithoutDailyLogInputSchema } from './UserProfileUpdateWithoutDailyLogInputSchema';
import { UserProfileUncheckedUpdateWithoutDailyLogInputSchema } from './UserProfileUncheckedUpdateWithoutDailyLogInputSchema';

export const UserProfileUpdateOneRequiredWithoutDailyLogNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutDailyLogNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutDailyLogInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutDailyLogInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutDailyLogInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutDailyLogInputSchema),z.lazy(() => UserProfileUpdateWithoutDailyLogInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutDailyLogInputSchema) ]).optional(),
}).strict();

export default UserProfileUpdateOneRequiredWithoutDailyLogNestedInputSchema;
