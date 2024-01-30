import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileCreateWithoutGoalsInputSchema } from './UserProfileCreateWithoutGoalsInputSchema';
import { UserProfileUncheckedCreateWithoutGoalsInputSchema } from './UserProfileUncheckedCreateWithoutGoalsInputSchema';

export const UserProfileCreateOrConnectWithoutGoalsInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutGoalsInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutGoalsInputSchema) ]),
}).strict();

export default UserProfileCreateOrConnectWithoutGoalsInputSchema;
