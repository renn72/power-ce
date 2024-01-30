import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalIncludeSchema } from '../inputTypeSchemas/GoalIncludeSchema'
import { GoalWhereInputSchema } from '../inputTypeSchemas/GoalWhereInputSchema'
import { GoalOrderByWithRelationInputSchema } from '../inputTypeSchemas/GoalOrderByWithRelationInputSchema'
import { GoalWhereUniqueInputSchema } from '../inputTypeSchemas/GoalWhereUniqueInputSchema'
import { GoalScalarFieldEnumSchema } from '../inputTypeSchemas/GoalScalarFieldEnumSchema'
import { UserProfileArgsSchema } from "../outputTypeSchemas/UserProfileArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const GoalSelectSchema: z.ZodType<Prisma.GoalSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  goal: z.boolean().optional(),
  date: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

export const GoalFindFirstArgsSchema: z.ZodType<Prisma.GoalFindFirstArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default GoalFindFirstArgsSchema;
