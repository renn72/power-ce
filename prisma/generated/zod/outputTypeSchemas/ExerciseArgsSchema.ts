import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseSelectSchema } from '../inputTypeSchemas/ExerciseSelectSchema';
import { ExerciseIncludeSchema } from '../inputTypeSchemas/ExerciseIncludeSchema';

export const ExerciseArgsSchema: z.ZodType<Prisma.ExerciseDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseSelectSchema).optional(),
  include: z.lazy(() => ExerciseIncludeSchema).optional(),
}).strict();

export default ExerciseArgsSchema;
