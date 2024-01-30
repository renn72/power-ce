import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientWhereInputSchema } from '../inputTypeSchemas/TrainerToClientWhereInputSchema'
import { TrainerToClientOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TrainerToClientOrderByWithAggregationInputSchema'
import { TrainerToClientScalarFieldEnumSchema } from '../inputTypeSchemas/TrainerToClientScalarFieldEnumSchema'
import { TrainerToClientScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TrainerToClientScalarWhereWithAggregatesInputSchema'

export const TrainerToClientGroupByArgsSchema: z.ZodType<Prisma.TrainerToClientGroupByArgs> = z.object({
  where: TrainerToClientWhereInputSchema.optional(),
  orderBy: z.union([ TrainerToClientOrderByWithAggregationInputSchema.array(),TrainerToClientOrderByWithAggregationInputSchema ]).optional(),
  by: TrainerToClientScalarFieldEnumSchema.array(),
  having: TrainerToClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TrainerToClientGroupByArgsSchema;
