import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExerciseIncludeSchema } from '../inputTypeSchemas/ExerciseIncludeSchema'
import { ExerciseWhereInputSchema } from '../inputTypeSchemas/ExerciseWhereInputSchema'
import { ExerciseOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExerciseOrderByWithRelationInputSchema'
import { ExerciseWhereUniqueInputSchema } from '../inputTypeSchemas/ExerciseWhereUniqueInputSchema'
import { ExerciseScalarFieldEnumSchema } from '../inputTypeSchemas/ExerciseScalarFieldEnumSchema'
import { SetFindManyArgsSchema } from "../outputTypeSchemas/SetFindManyArgsSchema"
import { DayArgsSchema } from "../outputTypeSchemas/DayArgsSchema"
import { SuperSetFindManyArgsSchema } from "../outputTypeSchemas/SuperSetFindManyArgsSchema"
import { ExerciseCountOutputTypeArgsSchema } from "../outputTypeSchemas/ExerciseCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExerciseSelectSchema: z.ZodType<Prisma.ExerciseSelect> = z.object({
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
  tempoDown: z.boolean().optional(),
  tempoPause: z.boolean().optional(),
  tempoUp: z.boolean().optional(),
  actualSets: z.boolean().optional(),
  actualReps: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  rpe: z.boolean().optional(),
  weight: z.boolean().optional(),
  dayId: z.boolean().optional(),
  isSS: z.boolean().optional(),
  notes: z.boolean().optional(),
  htmlLink: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  set: z.union([z.boolean(),z.lazy(() => SetFindManyArgsSchema)]).optional(),
  day: z.union([z.boolean(),z.lazy(() => DayArgsSchema)]).optional(),
  ss: z.union([z.boolean(),z.lazy(() => SuperSetFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExerciseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ExerciseFindFirstArgsSchema: z.ZodType<Prisma.ExerciseFindFirstArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default ExerciseFindFirstArgsSchema;
