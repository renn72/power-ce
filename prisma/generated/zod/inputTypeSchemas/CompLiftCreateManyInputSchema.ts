import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const CompLiftCreateManyInputSchema: z.ZodType<Prisma.CompLiftCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  name: z.string(),
  Age: z.string(),
  AgeClass: z.string(),
  BirthYearClass: z.string(),
  Division: z.string(),
  Event: z.string(),
  BodyweightKg: z.string().optional().nullable(),
  WeightClass: z.string().optional().nullable(),
  Squat1: z.string().optional().nullable(),
  Squat2: z.string().optional().nullable(),
  Squat3: z.string().optional().nullable(),
  Squat4: z.string().optional().nullable(),
  Bench1: z.string().optional().nullable(),
  Bench2: z.string().optional().nullable(),
  Bench3: z.string().optional().nullable(),
  Bench4: z.string().optional().nullable(),
  Deadlift1: z.string().optional().nullable(),
  Deadlift2: z.string().optional().nullable(),
  Deadlift3: z.string().optional().nullable(),
  Deadlift4: z.string().optional().nullable(),
  Total: z.string().optional().nullable(),
  Place: z.string().optional().nullable(),
  Dots: z.string().optional().nullable(),
  Wilks: z.string().optional().nullable(),
  Glossbrenner: z.string().optional().nullable(),
  GoodLift: z.string().optional().nullable(),
  Federation: z.string().optional().nullable(),
  Date: z.string().optional().nullable(),
  MeetCountry: z.string().optional().nullable(),
  MeetState: z.string().optional().nullable(),
  MeetTown: z.string().optional().nullable(),
  MeetName: z.string().optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable(),
  flield6: z.string().optional().nullable(),
  flield7: z.string().optional().nullable(),
  flield8: z.string().optional().nullable(),
  flield9: z.string().optional().nullable(),
  flield0: z.string().optional().nullable()
}).strict();

export default CompLiftCreateManyInputSchema;
