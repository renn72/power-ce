import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetIncludeSchema } from '../inputTypeSchemas/SetIncludeSchema'
import { SetWhereUniqueInputSchema } from '../inputTypeSchemas/SetWhereUniqueInputSchema'
import { ExerciseArgsSchema } from "../outputTypeSchemas/ExerciseArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SetSelectSchema: z.ZodType<Prisma.SetSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  rep: z.boolean().optional(),
  rpe: z.boolean().optional(),
  weight: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  name: z.boolean().optional(),
  lift: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  actualReps: z.boolean().optional(),
  estiamtedOnerm: z.boolean().optional(),
  exerciseId: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
}).strict()

export const SetFindUniqueArgsSchema: z.ZodType<Prisma.SetFindUniqueArgs> = z.object({
  select: SetSelectSchema.optional(),
  include: SetIncludeSchema.optional(),
  where: SetWhereUniqueInputSchema,
}).strict() ;

export default SetFindUniqueArgsSchema;
