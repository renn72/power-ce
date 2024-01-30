import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.UserProfileCountOutputTypeSelect> = z.object({
  goals: z.boolean().optional(),
  dailyLog: z.boolean().optional(),
}).strict();

export default UserProfileCountOutputTypeSelectSchema;
