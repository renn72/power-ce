import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutGoalsInputSchema } from './UserProfileCreateWithoutGoalsInputSchema';
import { UserProfileUncheckedCreateWithoutGoalsInputSchema } from './UserProfileUncheckedCreateWithoutGoalsInputSchema';
import { UserProfileCreateOrConnectWithoutGoalsInputSchema } from './UserProfileCreateOrConnectWithoutGoalsInputSchema';
import { UserProfileUpsertWithoutGoalsInputSchema } from './UserProfileUpsertWithoutGoalsInputSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileUpdateToOneWithWhereWithoutGoalsInputSchema } from './UserProfileUpdateToOneWithWhereWithoutGoalsInputSchema';
import { UserProfileUpdateWithoutGoalsInputSchema } from './UserProfileUpdateWithoutGoalsInputSchema';
import { UserProfileUncheckedUpdateWithoutGoalsInputSchema } from './UserProfileUncheckedUpdateWithoutGoalsInputSchema';

export const UserProfileUpdateOneRequiredWithoutGoalsNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutGoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutGoalsInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutGoalsInputSchema),z.lazy(() => UserProfileUpdateWithoutGoalsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutGoalsInputSchema) ]).optional(),
}).strict();

export default UserProfileUpdateOneRequiredWithoutGoalsNestedInputSchema;
