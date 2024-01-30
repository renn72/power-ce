import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetFindManyArgsSchema } from "../outputTypeSchemas/SetFindManyArgsSchema"
import { DayArgsSchema } from "../outputTypeSchemas/DayArgsSchema"
import { SuperSetFindManyArgsSchema } from "../outputTypeSchemas/SuperSetFindManyArgsSchema"
import { ExerciseCountOutputTypeArgsSchema } from "../outputTypeSchemas/ExerciseCountOutputTypeArgsSchema"

export const ExerciseIncludeSchema: z.ZodType<Prisma.ExerciseInclude> = z.object({
  set: z.union([z.boolean(),z.lazy(() => SetFindManyArgsSchema)]).optional(),
  day: z.union([z.boolean(),z.lazy(() => DayArgsSchema)]).optional(),
  ss: z.union([z.boolean(),z.lazy(() => SuperSetFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ExerciseIncludeSchema;
