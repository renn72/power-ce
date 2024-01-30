import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseArgsSchema } from "../outputTypeSchemas/ExerciseArgsSchema"

export const SetIncludeSchema: z.ZodType<Prisma.SetInclude> = z.object({
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
}).strict()

export default SetIncludeSchema;
