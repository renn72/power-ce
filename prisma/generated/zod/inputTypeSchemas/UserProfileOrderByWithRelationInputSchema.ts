import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { GoalOrderByRelationAggregateInputSchema } from './GoalOrderByRelationAggregateInputSchema';
import { DailyLogOrderByRelationAggregateInputSchema } from './DailyLogOrderByRelationAggregateInputSchema';

export const UserProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  DOB: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  height: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  targetWeight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weightGoal: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activityLevelTraining: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  activityLevelRest: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  squatOneRepMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  benchOneRepMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deadliftOneRepMax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  programInterval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isChecked: z.lazy(() => SortOrderSchema).optional(),
  sp1_1: z.lazy(() => SortOrderSchema).optional(),
  sp1_2: z.lazy(() => SortOrderSchema).optional(),
  sp1_3: z.lazy(() => SortOrderSchema).optional(),
  sp2_1: z.lazy(() => SortOrderSchema).optional(),
  sp2_2: z.lazy(() => SortOrderSchema).optional(),
  sp2_3: z.lazy(() => SortOrderSchema).optional(),
  sp3_1: z.lazy(() => SortOrderSchema).optional(),
  sp3_2: z.lazy(() => SortOrderSchema).optional(),
  sp3_3: z.lazy(() => SortOrderSchema).optional(),
  bp1_1: z.lazy(() => SortOrderSchema).optional(),
  bp1_2: z.lazy(() => SortOrderSchema).optional(),
  bp1_3: z.lazy(() => SortOrderSchema).optional(),
  bp2_1: z.lazy(() => SortOrderSchema).optional(),
  bp2_2: z.lazy(() => SortOrderSchema).optional(),
  bp2_3: z.lazy(() => SortOrderSchema).optional(),
  bp3_1: z.lazy(() => SortOrderSchema).optional(),
  bp3_2: z.lazy(() => SortOrderSchema).optional(),
  bp3_3: z.lazy(() => SortOrderSchema).optional(),
  dp1_1: z.lazy(() => SortOrderSchema).optional(),
  dp1_2: z.lazy(() => SortOrderSchema).optional(),
  dp1_3: z.lazy(() => SortOrderSchema).optional(),
  dp2_1: z.lazy(() => SortOrderSchema).optional(),
  dp2_2: z.lazy(() => SortOrderSchema).optional(),
  dp2_3: z.lazy(() => SortOrderSchema).optional(),
  dp3_1: z.lazy(() => SortOrderSchema).optional(),
  dp3_2: z.lazy(() => SortOrderSchema).optional(),
  dp3_3: z.lazy(() => SortOrderSchema).optional(),
  fatAdjustment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  carbAdjustment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  proteinAdjustment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield2: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flield3: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  goals: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional(),
  dailyLog: z.lazy(() => DailyLogOrderByRelationAggregateInputSchema).optional()
}).strict();

export default UserProfileOrderByWithRelationInputSchema;
