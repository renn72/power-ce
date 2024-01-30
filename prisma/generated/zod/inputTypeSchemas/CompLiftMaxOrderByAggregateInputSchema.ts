import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const CompLiftMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompLiftMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  Age: z.lazy(() => SortOrderSchema).optional(),
  AgeClass: z.lazy(() => SortOrderSchema).optional(),
  BirthYearClass: z.lazy(() => SortOrderSchema).optional(),
  Division: z.lazy(() => SortOrderSchema).optional(),
  Event: z.lazy(() => SortOrderSchema).optional(),
  BodyweightKg: z.lazy(() => SortOrderSchema).optional(),
  WeightClass: z.lazy(() => SortOrderSchema).optional(),
  Squat1: z.lazy(() => SortOrderSchema).optional(),
  Squat2: z.lazy(() => SortOrderSchema).optional(),
  Squat3: z.lazy(() => SortOrderSchema).optional(),
  Squat4: z.lazy(() => SortOrderSchema).optional(),
  Bench1: z.lazy(() => SortOrderSchema).optional(),
  Bench2: z.lazy(() => SortOrderSchema).optional(),
  Bench3: z.lazy(() => SortOrderSchema).optional(),
  Bench4: z.lazy(() => SortOrderSchema).optional(),
  Deadlift1: z.lazy(() => SortOrderSchema).optional(),
  Deadlift2: z.lazy(() => SortOrderSchema).optional(),
  Deadlift3: z.lazy(() => SortOrderSchema).optional(),
  Deadlift4: z.lazy(() => SortOrderSchema).optional(),
  Total: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => SortOrderSchema).optional(),
  Dots: z.lazy(() => SortOrderSchema).optional(),
  Wilks: z.lazy(() => SortOrderSchema).optional(),
  Glossbrenner: z.lazy(() => SortOrderSchema).optional(),
  GoodLift: z.lazy(() => SortOrderSchema).optional(),
  Federation: z.lazy(() => SortOrderSchema).optional(),
  Date: z.lazy(() => SortOrderSchema).optional(),
  MeetCountry: z.lazy(() => SortOrderSchema).optional(),
  MeetState: z.lazy(() => SortOrderSchema).optional(),
  MeetTown: z.lazy(() => SortOrderSchema).optional(),
  MeetName: z.lazy(() => SortOrderSchema).optional(),
  flield1: z.lazy(() => SortOrderSchema).optional(),
  flield2: z.lazy(() => SortOrderSchema).optional(),
  flield3: z.lazy(() => SortOrderSchema).optional(),
  flield4: z.lazy(() => SortOrderSchema).optional(),
  flield5: z.lazy(() => SortOrderSchema).optional(),
  flield6: z.lazy(() => SortOrderSchema).optional(),
  flield7: z.lazy(() => SortOrderSchema).optional(),
  flield8: z.lazy(() => SortOrderSchema).optional(),
  flield9: z.lazy(() => SortOrderSchema).optional(),
  flield0: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default CompLiftMaxOrderByAggregateInputSchema;
