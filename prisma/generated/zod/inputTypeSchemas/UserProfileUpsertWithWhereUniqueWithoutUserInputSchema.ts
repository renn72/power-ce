import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileUpdateWithoutUserInputSchema } from './UserProfileUpdateWithoutUserInputSchema';
import { UserProfileUncheckedUpdateWithoutUserInputSchema } from './UserProfileUncheckedUpdateWithoutUserInputSchema';
import { UserProfileCreateWithoutUserInputSchema } from './UserProfileCreateWithoutUserInputSchema';
import { UserProfileUncheckedCreateWithoutUserInputSchema } from './UserProfileUncheckedCreateWithoutUserInputSchema';

export const UserProfileUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserProfileUpsertWithWhereUniqueWithoutUserInputSchema;
