import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseFindManyArgsSchema } from "../outputTypeSchemas/ExerciseFindManyArgsSchema"
import { WeekArgsSchema } from "../outputTypeSchemas/WeekArgsSchema"
import { DayCountOutputTypeArgsSchema } from "../outputTypeSchemas/DayCountOutputTypeArgsSchema"

export const DayIncludeSchema: z.ZodType<Prisma.DayInclude> = z.object({
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  week: z.union([z.boolean(),z.lazy(() => WeekArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DayCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default DayIncludeSchema;
