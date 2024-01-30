import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressWhereInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereInputSchema'
import { CompLiftAddressOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompLiftAddressOrderByWithRelationInputSchema'
import { CompLiftAddressWhereUniqueInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereUniqueInputSchema'

export const CompLiftAddressAggregateArgsSchema: z.ZodType<Prisma.CompLiftAddressAggregateArgs> = z.object({
  where: CompLiftAddressWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftAddressOrderByWithRelationInputSchema.array(),CompLiftAddressOrderByWithRelationInputSchema ]).optional(),
  cursor: CompLiftAddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CompLiftAddressAggregateArgsSchema;
