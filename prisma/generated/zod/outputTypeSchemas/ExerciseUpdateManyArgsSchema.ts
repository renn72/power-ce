import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseUpdateManyMutationInputSchema } from '../inputTypeSchemas/ExerciseUpdateManyMutationInputSchema'
import { ExerciseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ExerciseUncheckedUpdateManyInputSchema'
import { ExerciseWhereInputSchema } from '../inputTypeSchemas/ExerciseWhereInputSchema'

export const ExerciseUpdateManyArgsSchema: z.ZodType<Prisma.ExerciseUpdateManyArgs> = z.object({
  data: z.union([ ExerciseUpdateManyMutationInputSchema,ExerciseUncheckedUpdateManyInputSchema ]),
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;

export default ExerciseUpdateManyArgsSchema;
