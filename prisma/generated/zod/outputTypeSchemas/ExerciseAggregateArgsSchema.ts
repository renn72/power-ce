import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseWhereInputSchema } from '../inputTypeSchemas/ExerciseWhereInputSchema'
import { ExerciseOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExerciseOrderByWithRelationInputSchema'
import { ExerciseWhereUniqueInputSchema } from '../inputTypeSchemas/ExerciseWhereUniqueInputSchema'

export const ExerciseAggregateArgsSchema: z.ZodType<Prisma.ExerciseAggregateArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ExerciseAggregateArgsSchema;
