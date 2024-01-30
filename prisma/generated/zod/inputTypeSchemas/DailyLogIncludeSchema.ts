import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsSchema } from "../outputTypeSchemas/UserProfileArgsSchema"

export const DailyLogIncludeSchema: z.ZodType<Prisma.DailyLogInclude> = z.object({
  UserProfile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

export default DailyLogIncludeSchema;
