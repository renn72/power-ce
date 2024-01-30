import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftFindManyArgsSchema } from "../outputTypeSchemas/LiftFindManyArgsSchema"
import { LiftsCountOutputTypeArgsSchema } from "../outputTypeSchemas/LiftsCountOutputTypeArgsSchema"

export const LiftsSelectSchema: z.ZodType<Prisma.LiftsSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  lift: z.union([z.boolean(),z.lazy(() => LiftFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LiftsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default LiftsSelectSchema;
