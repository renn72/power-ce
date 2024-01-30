import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseCreateManyInputSchema } from '../inputTypeSchemas/ExerciseCreateManyInputSchema'

export const ExerciseCreateManyArgsSchema: z.ZodType<Prisma.ExerciseCreateManyArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ExerciseCreateManyArgsSchema;
