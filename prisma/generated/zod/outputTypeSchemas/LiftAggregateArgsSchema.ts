import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftWhereInputSchema } from '../inputTypeSchemas/LiftWhereInputSchema'
import { LiftOrderByWithRelationInputSchema } from '../inputTypeSchemas/LiftOrderByWithRelationInputSchema'
import { LiftWhereUniqueInputSchema } from '../inputTypeSchemas/LiftWhereUniqueInputSchema'

export const LiftAggregateArgsSchema: z.ZodType<Prisma.LiftAggregateArgs> = z.object({
  where: LiftWhereInputSchema.optional(),
  orderBy: z.union([ LiftOrderByWithRelationInputSchema.array(),LiftOrderByWithRelationInputSchema ]).optional(),
  cursor: LiftWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default LiftAggregateArgsSchema;
