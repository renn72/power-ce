import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileIncludeSchema } from '../inputTypeSchemas/UserProfileIncludeSchema'
import { UserProfileUpdateInputSchema } from '../inputTypeSchemas/UserProfileUpdateInputSchema'
import { UserProfileUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserProfileUncheckedUpdateInputSchema'
import { UserProfileWhereUniqueInputSchema } from '../inputTypeSchemas/UserProfileWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { GoalFindManyArgsSchema } from "../outputTypeSchemas/GoalFindManyArgsSchema"
import { DailyLogFindManyArgsSchema } from "../outputTypeSchemas/DailyLogFindManyArgsSchema"
import { UserProfileCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserProfileCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserProfileSelectSchema: z.ZodType<Prisma.UserProfileSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  DOB: z.boolean().optional(),
  gender: z.boolean().optional(),
  height: z.boolean().optional(),
  weight: z.boolean().optional(),
  targetWeight: z.boolean().optional(),
  weightGoal: z.boolean().optional(),
  activityLevelTraining: z.boolean().optional(),
  activityLevelRest: z.boolean().optional(),
  squatOneRepMax: z.boolean().optional(),
  benchOneRepMax: z.boolean().optional(),
  deadliftOneRepMax: z.boolean().optional(),
  programInterval: z.boolean().optional(),
  isChecked: z.boolean().optional(),
  sp1_1: z.boolean().optional(),
  sp1_2: z.boolean().optional(),
  sp1_3: z.boolean().optional(),
  sp2_1: z.boolean().optional(),
  sp2_2: z.boolean().optional(),
  sp2_3: z.boolean().optional(),
  sp3_1: z.boolean().optional(),
  sp3_2: z.boolean().optional(),
  sp3_3: z.boolean().optional(),
  bp1_1: z.boolean().optional(),
  bp1_2: z.boolean().optional(),
  bp1_3: z.boolean().optional(),
  bp2_1: z.boolean().optional(),
  bp2_2: z.boolean().optional(),
  bp2_3: z.boolean().optional(),
  bp3_1: z.boolean().optional(),
  bp3_2: z.boolean().optional(),
  bp3_3: z.boolean().optional(),
  dp1_1: z.boolean().optional(),
  dp1_2: z.boolean().optional(),
  dp1_3: z.boolean().optional(),
  dp2_1: z.boolean().optional(),
  dp2_2: z.boolean().optional(),
  dp2_3: z.boolean().optional(),
  dp3_1: z.boolean().optional(),
  dp3_2: z.boolean().optional(),
  dp3_3: z.boolean().optional(),
  fatAdjustment: z.boolean().optional(),
  carbAdjustment: z.boolean().optional(),
  proteinAdjustment: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  dailyLog: z.union([z.boolean(),z.lazy(() => DailyLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserProfileUpdateArgsSchema: z.ZodType<Prisma.UserProfileUpdateArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  data: z.union([ UserProfileUpdateInputSchema,UserProfileUncheckedUpdateInputSchema ]),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export default UserProfileUpdateArgsSchema;
