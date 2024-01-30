import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const DailyLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.DailyLogSumOrderByAggregateInput> = z.object({
  weight: z.lazy(() => SortOrderSchema).optional(),
  fat: z.lazy(() => SortOrderSchema).optional(),
  carbs: z.lazy(() => SortOrderSchema).optional(),
  protein: z.lazy(() => SortOrderSchema).optional(),
  calories: z.lazy(() => SortOrderSchema).optional(),
  steps: z.lazy(() => SortOrderSchema).optional(),
  motivation: z.lazy(() => SortOrderSchema).optional(),
  sleepHrs: z.lazy(() => SortOrderSchema).optional(),
  sleepQuality: z.lazy(() => SortOrderSchema).optional(),
  recovery: z.lazy(() => SortOrderSchema).optional(),
  stress: z.lazy(() => SortOrderSchema).optional(),
  energy: z.lazy(() => SortOrderSchema).optional(),
  restingHeartRate: z.lazy(() => SortOrderSchema).optional(),
  vo2Max: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default DailyLogSumOrderByAggregateInputSchema;
