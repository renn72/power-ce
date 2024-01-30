import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsArgsSchema } from "../outputTypeSchemas/LiftsArgsSchema"

export const LiftSelectSchema: z.ZodType<Prisma.LiftSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  createdAtUser: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  liftId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  weight: z.boolean().optional(),
  reps: z.boolean().optional(),
  liftName: z.boolean().optional(),
  notes: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  lift: z.union([z.boolean(),z.lazy(() => LiftsArgsSchema)]).optional(),
}).strict()

export default LiftSelectSchema;
