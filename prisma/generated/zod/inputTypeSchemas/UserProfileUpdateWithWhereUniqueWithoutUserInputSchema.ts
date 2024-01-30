import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileUpdateWithoutUserInputSchema } from './UserProfileUpdateWithoutUserInputSchema';
import { UserProfileUncheckedUpdateWithoutUserInputSchema } from './UserProfileUncheckedUpdateWithoutUserInputSchema';

export const UserProfileUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default UserProfileUpdateWithWhereUniqueWithoutUserInputSchema;
