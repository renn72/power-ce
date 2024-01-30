import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { GoalIncludeSchema } from '../inputTypeSchemas/GoalIncludeSchema'
import { GoalUpdateInputSchema } from '../inputTypeSchemas/GoalUpdateInputSchema'
import { GoalUncheckedUpdateInputSchema } from '../inputTypeSchemas/GoalUncheckedUpdateInputSchema'
import { GoalWhereUniqueInputSchema } from '../inputTypeSchemas/GoalWhereUniqueInputSchema'
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

export const GoalUpdateArgsSchema: z.ZodType<Prisma.GoalUpdateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export default GoalUpdateArgsSchema;
