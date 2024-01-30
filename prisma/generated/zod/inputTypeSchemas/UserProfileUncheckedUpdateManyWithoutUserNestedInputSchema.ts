import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserProfileCreateWithoutUserInputSchema } from './UserProfileCreateWithoutUserInputSchema';
import { UserProfileUncheckedCreateWithoutUserInputSchema } from './UserProfileUncheckedCreateWithoutUserInputSchema';
import { UserProfileCreateOrConnectWithoutUserInputSchema } from './UserProfileCreateOrConnectWithoutUserInputSchema';
import { UserProfileUpsertWithWhereUniqueWithoutUserInputSchema } from './UserProfileUpsertWithWhereUniqueWithoutUserInputSchema';
import { UserProfileCreateManyUserInputEnvelopeSchema } from './UserProfileCreateManyUserInputEnvelopeSchema';
import { UserProfileWhereUniqueInputSchema } from './UserProfileWhereUniqueInputSchema';
import { UserProfileUpdateWithWhereUniqueWithoutUserInputSchema } from './UserProfileUpdateWithWhereUniqueWithoutUserInputSchema';
import { UserProfileUpdateManyWithWhereWithoutUserInputSchema } from './UserProfileUpdateManyWithWhereWithoutUserInputSchema';
import { UserProfileScalarWhereInputSchema } from './UserProfileScalarWhereInputSchema';

export const UserProfileUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileCreateWithoutUserInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProfileCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProfileUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProfileUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProfileScalarWhereInputSchema),z.lazy(() => UserProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserProfileUncheckedUpdateManyWithoutUserNestedInputSchema;
