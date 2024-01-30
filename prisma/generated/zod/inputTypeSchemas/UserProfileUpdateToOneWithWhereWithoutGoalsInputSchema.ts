import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';
import { UserProfileUpdateWithoutGoalsInputSchema } from './UserProfileUpdateWithoutGoalsInputSchema';
import { UserProfileUncheckedUpdateWithoutGoalsInputSchema } from './UserProfileUncheckedUpdateWithoutGoalsInputSchema';

export const UserProfileUpdateToOneWithWhereWithoutGoalsInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutGoalsInput> = z.object({
  where: z.lazy(() => UserProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutGoalsInputSchema) ]),
}).strict();

export default UserProfileUpdateToOneWithWhereWithoutGoalsInputSchema;
