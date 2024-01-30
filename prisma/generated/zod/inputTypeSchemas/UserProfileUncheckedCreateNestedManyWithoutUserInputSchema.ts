import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutUserInputSchema } from './UserProfileCreateWithoutUserInputSchema';
import { UserProfileUncheckedCreateWithoutUserInputSchema } from './UserProfileUncheckedCreateWithoutUserInputSchema';
import { UserProfileCreateOrConnectWithoutUserInputSchema } from './UserProfileCreateOrConnectWithoutUserInputSchema';
import { UserProfileCreateManyUserInputEnvelopeSchema } from './UserProfileCreateManyUserInputEnvelopeSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';

export const UserProfileUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileCreateWithoutUserInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProfileCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserProfileUncheckedCreateNestedManyWithoutUserInputSchema;
