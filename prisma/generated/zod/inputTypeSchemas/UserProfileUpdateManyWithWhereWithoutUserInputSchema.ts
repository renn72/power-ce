import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileScalarWhereInputSchema } from './UserProfileScalarWhereInputSchema';
import { UserProfileUpdateManyMutationInputSchema } from './UserProfileUpdateManyMutationInputSchema';
import { UserProfileUncheckedUpdateManyWithoutUserInputSchema } from './UserProfileUncheckedUpdateManyWithoutUserInputSchema';

export const UserProfileUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProfileUpdateManyMutationInputSchema),z.lazy(() => UserProfileUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default UserProfileUpdateManyWithWhereWithoutUserInputSchema;
