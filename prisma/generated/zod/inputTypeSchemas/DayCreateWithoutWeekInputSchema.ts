import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateNestedManyWithoutDayInputSchema } from './ExerciseCreateNestedManyWithoutDayInputSchema';

export const DayCreateWithoutWeekInputSchema: z.ZodType<Prisma.DayCreateWithoutWeekInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  trainerId: z.string().optional().nullable(),
  isTemplate: z.boolean().optional().nullable(),
  isRestDay: z.boolean(),
  warmupTemplateId: z.string().optional().nullable(),
  energyRating: z.string().optional().nullable(),
  isComplete: z.boolean().optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable(),
  exercise: z.lazy(() => ExerciseCreateNestedManyWithoutDayInputSchema).optional()
}).strict();

export default DayCreateWithoutWeekInputSchema;
