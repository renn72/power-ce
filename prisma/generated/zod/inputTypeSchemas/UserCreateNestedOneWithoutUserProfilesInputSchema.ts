import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUserProfilesInputSchema } from './UserCreateWithoutUserProfilesInputSchema';
import { UserUncheckedCreateWithoutUserProfilesInputSchema } from './UserUncheckedCreateWithoutUserProfilesInputSchema';
import { UserCreateOrConnectWithoutUserProfilesInputSchema } from './UserCreateOrConnectWithoutUserProfilesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutUserProfilesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserProfilesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProfilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProfilesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutUserProfilesInputSchema;
