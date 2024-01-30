import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseCountOutputTypeSelectSchema } from './ExerciseCountOutputTypeSelectSchema';

export const ExerciseCountOutputTypeArgsSchema: z.ZodType<Prisma.ExerciseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ExerciseCountOutputTypeSelectSchema;
