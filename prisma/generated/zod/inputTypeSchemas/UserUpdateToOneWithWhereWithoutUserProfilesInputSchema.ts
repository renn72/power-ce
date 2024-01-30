import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutUserProfilesInputSchema } from './UserUpdateWithoutUserProfilesInputSchema';
import { UserUncheckedUpdateWithoutUserProfilesInputSchema } from './UserUncheckedUpdateWithoutUserProfilesInputSchema';

export const UserUpdateToOneWithWhereWithoutUserProfilesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserProfilesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProfilesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutUserProfilesInputSchema;
