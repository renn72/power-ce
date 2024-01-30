import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutUserProfilesInputSchema } from './UserCreateWithoutUserProfilesInputSchema';
import { UserUncheckedCreateWithoutUserProfilesInputSchema } from './UserUncheckedCreateWithoutUserProfilesInputSchema';

export const UserCreateOrConnectWithoutUserProfilesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserProfilesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProfilesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutUserProfilesInputSchema;
