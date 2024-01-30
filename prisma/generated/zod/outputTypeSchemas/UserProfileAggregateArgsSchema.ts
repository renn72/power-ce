import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputSchema } from '../inputTypeSchemas/UserProfileWhereInputSchema'
import { UserProfileOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserProfileOrderByWithRelationInputSchema'
import { UserProfileWhereUniqueInputSchema } from '../inputTypeSchemas/UserProfileWhereUniqueInputSchema'

export const UserProfileAggregateArgsSchema: z.ZodType<Prisma.UserProfileAggregateArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserProfileAggregateArgsSchema;
