import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetWhereInputSchema } from '../inputTypeSchemas/SuperSetWhereInputSchema'
import { SuperSetOrderByWithRelationInputSchema } from '../inputTypeSchemas/SuperSetOrderByWithRelationInputSchema'
import { SuperSetWhereUniqueInputSchema } from '../inputTypeSchemas/SuperSetWhereUniqueInputSchema'

export const SuperSetAggregateArgsSchema: z.ZodType<Prisma.SuperSetAggregateArgs> = z.object({
  where: SuperSetWhereInputSchema.optional(),
  orderBy: z.union([ SuperSetOrderByWithRelationInputSchema.array(),SuperSetOrderByWithRelationInputSchema ]).optional(),
  cursor: SuperSetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SuperSetAggregateArgsSchema;
