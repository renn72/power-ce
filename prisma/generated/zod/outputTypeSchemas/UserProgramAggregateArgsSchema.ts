import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProgramWhereInputSchema } from '../inputTypeSchemas/UserProgramWhereInputSchema'
import { UserProgramOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserProgramOrderByWithRelationInputSchema'
import { UserProgramWhereUniqueInputSchema } from '../inputTypeSchemas/UserProgramWhereUniqueInputSchema'

export const UserProgramAggregateArgsSchema: z.ZodType<Prisma.UserProgramAggregateArgs> = z.object({
  where: UserProgramWhereInputSchema.optional(),
  orderBy: z.union([ UserProgramOrderByWithRelationInputSchema.array(),UserProgramOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProgramWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserProgramAggregateArgsSchema;
