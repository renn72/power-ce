import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsSchema } from "../outputTypeSchemas/UserProfileArgsSchema"

export const GoalIncludeSchema: z.ZodType<Prisma.GoalInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

export default GoalIncludeSchema;
