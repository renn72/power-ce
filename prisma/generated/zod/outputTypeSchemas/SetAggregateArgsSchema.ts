import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetWhereInputSchema } from '../inputTypeSchemas/SetWhereInputSchema'
import { SetOrderByWithRelationInputSchema } from '../inputTypeSchemas/SetOrderByWithRelationInputSchema'
import { SetWhereUniqueInputSchema } from '../inputTypeSchemas/SetWhereUniqueInputSchema'

export const SetAggregateArgsSchema: z.ZodType<Prisma.SetAggregateArgs> = z.object({
  where: SetWhereInputSchema.optional(),
  orderBy: z.union([ SetOrderByWithRelationInputSchema.array(),SetOrderByWithRelationInputSchema ]).optional(),
  cursor: SetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SetAggregateArgsSchema;
