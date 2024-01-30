import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileSelectSchema } from '../inputTypeSchemas/UserProfileSelectSchema';
import { UserProfileIncludeSchema } from '../inputTypeSchemas/UserProfileIncludeSchema';

export const UserProfileArgsSchema: z.ZodType<Prisma.UserProfileDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileSelectSchema).optional(),
  include: z.lazy(() => UserProfileIncludeSchema).optional(),
}).strict();

export default UserProfileArgsSchema;
