import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseWhereInputSchema } from '../inputTypeSchemas/ExerciseWhereInputSchema'

export const ExerciseDeleteManyArgsSchema: z.ZodType<Prisma.ExerciseDeleteManyArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;

export default ExerciseDeleteManyArgsSchema;
