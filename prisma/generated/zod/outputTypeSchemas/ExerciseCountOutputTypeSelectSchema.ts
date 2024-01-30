import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ExerciseCountOutputTypeSelectSchema: z.ZodType<Prisma.ExerciseCountOutputTypeSelect> = z.object({
  set: z.boolean().optional(),
  ss: z.boolean().optional(),
}).strict();

export default ExerciseCountOutputTypeSelectSchema;
