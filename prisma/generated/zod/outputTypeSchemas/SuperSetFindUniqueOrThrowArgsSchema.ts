import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetIncludeSchema } from '../inputTypeSchemas/SuperSetIncludeSchema'
import { SuperSetWhereUniqueInputSchema } from '../inputTypeSchemas/SuperSetWhereUniqueInputSchema'
import { ExerciseArgsSchema } from "../outputTypeSchemas/ExerciseArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SuperSetSelectSchema: z.ZodType<Prisma.SuperSetSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  lift: z.boolean().optional(),
  sets: z.boolean().optional(),
  reps: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  isTemplate: z.boolean().optional(),
  repUnit: z.boolean().optional(),
  weightType: z.boolean().optional(),
  onerm: z.boolean().optional(),
  onermTop: z.boolean().optional(),
  weightTop: z.boolean().optional(),
  weightBottom: z.boolean().optional(),
  targetRpe: z.boolean().optional(),
  targetRpeHigh: z.boolean().optional(),
  restTime: z.boolean().optional(),
  restUnit: z.boolean().optional(),
  setWieght: z.boolean().optional(),
  setTopWeight: z.boolean().optional(),
  isEstimatedOnerm: z.boolean().optional(),
  estimatedOnermIndex: z.boolean().optional(),
  actualSets: z.boolean().optional(),
  actualReps: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  rpe: z.boolean().optional(),
  weight: z.boolean().optional(),
  exerciseId: z.boolean().optional(),
  notes: z.boolean().optional(),
  htmlLink: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  exercise: z.union([z.boolean(),z.lazy(() => ExerciseArgsSchema)]).optional(),
}).strict()

export const SuperSetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SuperSetFindUniqueOrThrowArgs> = z.object({
  select: SuperSetSelectSchema.optional(),
  include: SuperSetIncludeSchema.optional(),
  where: SuperSetWhereUniqueInputSchema,
}).strict() ;

export default SuperSetFindUniqueOrThrowArgsSchema;
