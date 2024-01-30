import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayFindManyArgsSchema } from "../outputTypeSchemas/DayFindManyArgsSchema"
import { BlockArgsSchema } from "../outputTypeSchemas/BlockArgsSchema"
import { WeekCountOutputTypeArgsSchema } from "../outputTypeSchemas/WeekCountOutputTypeArgsSchema"

export const WeekIncludeSchema: z.ZodType<Prisma.WeekInclude> = z.object({
  day: z.union([z.boolean(),z.lazy(() => DayFindManyArgsSchema)]).optional(),
  block: z.union([z.boolean(),z.lazy(() => BlockArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WeekCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WeekIncludeSchema;
