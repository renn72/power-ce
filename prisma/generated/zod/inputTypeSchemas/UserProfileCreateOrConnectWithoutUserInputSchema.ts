import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileCreateWithoutUserInputSchema } from './UserProfileCreateWithoutUserInputSchema';
import { UserProfileUncheckedCreateWithoutUserInputSchema } from './UserProfileUncheckedCreateWithoutUserInputSchema';

export const UserProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserProfileCreateOrConnectWithoutUserInputSchema;
