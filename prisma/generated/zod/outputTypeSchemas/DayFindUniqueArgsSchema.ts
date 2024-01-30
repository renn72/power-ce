import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayIncludeSchema } from '../inputTypeSchemas/DayIncludeSchema'
import { DayWhereUniqueInputSchema } from '../inputTypeSchemas/DayWhereUniqueInputSchema'
import { ExerciseFindManyArgsSchema } from "../outputTypeSchemas/ExerciseFindManyArgsSchema"
import { WeekArgsSchema } from "../outputTypeSchemas/WeekArgsSchema"
import { DayCountOutputTypeArgsSchema } from "../outputTypeSchemas/DayCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DaySelectSchema: z.ZodType<Prisma.DaySelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  isTemplate: z.boolean().optional(),
  isRestDay: z.boolean().optional(),
  weekId: z.boolean().optional(),
  warmupTemplateId: z.boolean().optional(),
  energyRating: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  week: z.union([z.boolean(),z.lazy(() => WeekArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DayCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DayFindUniqueArgsSchema: z.ZodType<Prisma.DayFindUniqueArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereUniqueInputSchema,
}).strict() ;

export default DayFindUniqueArgsSchema;
