import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsSchema } from "../outputTypeSchemas/UserProfileArgsSchema"

export const DailyLogSelectSchema: z.ZodType<Prisma.DailyLogSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  weight: z.boolean().optional(),
  fat: z.boolean().optional(),
  carbs: z.boolean().optional(),
  protein: z.boolean().optional(),
  calories: z.boolean().optional(),
  steps: z.boolean().optional(),
  motivation: z.boolean().optional(),
  notes: z.boolean().optional(),
  sleepHrs: z.boolean().optional(),
  sleepQuality: z.boolean().optional(),
  recovery: z.boolean().optional(),
  stress: z.boolean().optional(),
  energy: z.boolean().optional(),
  restingHeartRate: z.boolean().optional(),
  vo2Max: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  UserProfile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

export default DailyLogSelectSchema;
