import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientWhereInputSchema } from '../inputTypeSchemas/TrainerToClientWhereInputSchema'
import { TrainerToClientOrderByWithRelationInputSchema } from '../inputTypeSchemas/TrainerToClientOrderByWithRelationInputSchema'
import { TrainerToClientWhereUniqueInputSchema } from '../inputTypeSchemas/TrainerToClientWhereUniqueInputSchema'

export const TrainerToClientAggregateArgsSchema: z.ZodType<Prisma.TrainerToClientAggregateArgs> = z.object({
  where: TrainerToClientWhereInputSchema.optional(),
  orderBy: z.union([ TrainerToClientOrderByWithRelationInputSchema.array(),TrainerToClientOrderByWithRelationInputSchema ]).optional(),
  cursor: TrainerToClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TrainerToClientAggregateArgsSchema;
