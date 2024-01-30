import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseWhereInputSchema } from '../inputTypeSchemas/ExerciseWhereInputSchema'
import { ExerciseOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ExerciseOrderByWithAggregationInputSchema'
import { ExerciseScalarFieldEnumSchema } from '../inputTypeSchemas/ExerciseScalarFieldEnumSchema'
import { ExerciseScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ExerciseScalarWhereWithAggregatesInputSchema'

export const ExerciseGroupByArgsSchema: z.ZodType<Prisma.ExerciseGroupByArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithAggregationInputSchema.array(),ExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: ExerciseScalarFieldEnumSchema.array(),
  having: ExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ExerciseGroupByArgsSchema;
