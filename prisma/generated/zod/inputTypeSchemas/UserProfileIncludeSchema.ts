import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { GoalFindManyArgsSchema } from "../outputTypeSchemas/GoalFindManyArgsSchema"
import { DailyLogFindManyArgsSchema } from "../outputTypeSchemas/DailyLogFindManyArgsSchema"
import { UserProfileCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserProfileCountOutputTypeArgsSchema"

export const UserProfileIncludeSchema: z.ZodType<Prisma.UserProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  dailyLog: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserProfileIncludeSchema;
