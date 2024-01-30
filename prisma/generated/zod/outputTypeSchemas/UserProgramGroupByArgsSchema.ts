import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramWhereInputSchema } from '../inputTypeSchemas/UserProgramWhereInputSchema'
import { UserProgramOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserProgramOrderByWithAggregationInputSchema'
import { UserProgramScalarFieldEnumSchema } from '../inputTypeSchemas/UserProgramScalarFieldEnumSchema'
import { UserProgramScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserProgramScalarWhereWithAggregatesInputSchema'

export const UserProgramGroupByArgsSchema: z.ZodType<Prisma.UserProgramGroupByArgs> = z.object({
  where: UserProgramWhereInputSchema.optional(),
  orderBy: z.union([ UserProgramOrderByWithAggregationInputSchema.array(),UserProgramOrderByWithAggregationInputSchema ]).optional(),
  by: UserProgramScalarFieldEnumSchema.array(),
  having: UserProgramScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserProgramGroupByArgsSchema;
