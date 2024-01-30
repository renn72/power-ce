import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileUpdateWithoutGoalsInputSchema } from './UserProfileUpdateWithoutGoalsInputSchema';
import { UserProfileUncheckedUpdateWithoutGoalsInputSchema } from './UserProfileUncheckedUpdateWithoutGoalsInputSchema';
import { UserProfileCreateWithoutGoalsInputSchema } from './UserProfileCreateWithoutGoalsInputSchema';
import { UserProfileUncheckedCreateWithoutGoalsInputSchema } from './UserProfileUncheckedCreateWithoutGoalsInputSchema';
import { UserProfileWhereInputSchema } from './UserProfileWhereInputSchema';

export const UserProfileUpsertWithoutGoalsInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutGoalsInput> = z.object({
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutGoalsInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutGoalsInputSchema) ]),
  where: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export default UserProfileUpsertWithoutGoalsInputSchema;
