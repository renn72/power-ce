import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayFindManyArgsSchema } from "../outputTypeSchemas/DayFindManyArgsSchema"
import { BlockArgsSchema } from "../outputTypeSchemas/BlockArgsSchema"
import { WeekCountOutputTypeArgsSchema } from "../outputTypeSchemas/WeekCountOutputTypeArgsSchema"

export const WeekSelectSchema: z.ZodType<Prisma.WeekSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  isTemplate: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  blockId: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  day: z.union([z.boolean(),z.lazy(() => DayFindManyArgsSchema)]).optional(),
  block: z.union([z.boolean(),z.lazy(() => BlockArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WeekCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WeekSelectSchema;
