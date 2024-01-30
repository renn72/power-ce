import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutGoalsInputSchema } from './UserProfileCreateWithoutGoalsInputSchema';
import { UserProfileUncheckedCreateWithoutGoalsInputSchema } from './UserProfileUncheckedCreateWithoutGoalsInputSchema';
import { UserProfileCreateOrConnectWithoutGoalsInputSchema } from './UserProfileCreateOrConnectWithoutGoalsInputSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';

export const UserProfileCreateNestedOneWithoutGoalsInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutGoalsInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export default UserProfileCreateNestedOneWithoutGoalsInputSchema;
