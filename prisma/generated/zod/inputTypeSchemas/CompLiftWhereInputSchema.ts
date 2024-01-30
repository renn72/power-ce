import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const CompLiftWhereInputSchema: z.ZodType<Prisma.CompLiftWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompLiftWhereInputSchema),z.lazy(() => CompLiftWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompLiftWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompLiftWhereInputSchema),z.lazy(() => CompLiftWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Age: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  AgeClass: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  BirthYearClass: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Division: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Event: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  BodyweightKg: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  WeightClass: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Squat1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Squat2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Squat3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Squat4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Bench1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Bench2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Bench3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Bench4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Deadlift1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Deadlift2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Deadlift3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Deadlift4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Total: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Place: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Dots: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Wilks: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Glossbrenner: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  GoodLift: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Federation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MeetCountry: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MeetState: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MeetTown: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MeetName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield6: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield7: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield8: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield9: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield0: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default CompLiftWhereInputSchema;
