import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutUserProfilesInputSchema } from './UserCreateWithoutUserProfilesInputSchema';
import { UserUncheckedCreateWithoutUserProfilesInputSchema } from './UserUncheckedCreateWithoutUserProfilesInputSchema';
import { UserCreateOrConnectWithoutUserProfilesInputSchema } from './UserCreateOrConnectWithoutUserProfilesInputSchema';
import { UserUpsertWithoutUserProfilesInputSchema } from './UserUpsertWithoutUserProfilesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutUserProfilesInputSchema } from './UserUpdateToOneWithWhereWithoutUserProfilesInputSchema';
import { UserUpdateWithoutUserProfilesInputSchema } from './UserUpdateWithoutUserProfilesInputSchema';
import { UserUncheckedUpdateWithoutUserProfilesInputSchema } from './UserUncheckedUpdateWithoutUserProfilesInputSchema';

export const UserUpdateOneWithoutUserProfilesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutUserProfilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProfilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProfilesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserProfilesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserProfilesInputSchema),z.lazy(() => UserUpdateWithoutUserProfilesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProfilesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneWithoutUserProfilesNestedInputSchema;
