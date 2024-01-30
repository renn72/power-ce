import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCountOutputTypeSelectSchema } from './UserProfileCountOutputTypeSelectSchema';

export const UserProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.UserProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export default UserProfileCountOutputTypeSelectSchema;
