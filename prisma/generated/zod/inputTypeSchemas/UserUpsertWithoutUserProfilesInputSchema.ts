import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutUserProfilesInputSchema } from './UserUpdateWithoutUserProfilesInputSchema';
import { UserUncheckedUpdateWithoutUserProfilesInputSchema } from './UserUncheckedUpdateWithoutUserProfilesInputSchema';
import { UserCreateWithoutUserProfilesInputSchema } from './UserCreateWithoutUserProfilesInputSchema';
import { UserUncheckedCreateWithoutUserProfilesInputSchema } from './UserUncheckedCreateWithoutUserProfilesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutUserProfilesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserProfilesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProfilesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProfilesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutUserProfilesInputSchema;
