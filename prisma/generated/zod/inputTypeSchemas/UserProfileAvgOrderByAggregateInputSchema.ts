import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileAvgOrderByAggregateInput> = z.object({
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  squatOneRepMax: z.lazy(() => SortOrderSchema).optional(),
  benchOneRepMax: z.lazy(() => SortOrderSchema).optional(),
  deadliftOneRepMax: z.lazy(() => SortOrderSchema).optional(),
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
  fatAdjustment: z.lazy(() => SortOrderSchema).optional(),
  carbAdjustment: z.lazy(() => SortOrderSchema).optional(),
  proteinAdjustment: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserProfileAvgOrderByAggregateInputSchema;
