import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputSchema } from '../inputTypeSchemas/UserProfileWhereInputSchema'
import { UserProfileOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserProfileOrderByWithAggregationInputSchema'
import { UserProfileScalarFieldEnumSchema } from '../inputTypeSchemas/UserProfileScalarFieldEnumSchema'
import { UserProfileScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserProfileScalarWhereWithAggregatesInputSchema'

export const UserProfileGroupByArgsSchema: z.ZodType<Prisma.UserProfileGroupByArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithAggregationInputSchema.array(),UserProfileOrderByWithAggregationInputSchema ]).optional(),
  by: UserProfileScalarFieldEnumSchema.array(),
  having: UserProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserProfileGroupByArgsSchema;
