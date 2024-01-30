import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { DecimalNullableFilterSchema } from './DecimalNullableFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const ExerciseScalarWhereInputSchema: z.ZodType<Prisma.ExerciseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lift: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sets: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  reps: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trainerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isTemplate: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  repUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weightType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  onerm: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  onermTop: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  weightTop: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  weightBottom: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  targetRpe: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  targetRpeHigh: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  restTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  restUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  setWieght: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  setTopWeight: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  isEstimatedOnerm: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  estimatedOnermIndex: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tempoDown: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tempoPause: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tempoUp: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  actualSets: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  actualReps: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  isComplete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  rpe: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  weight: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  dayId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isSS: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  htmlLink: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield4: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield5: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default ExerciseScalarWhereInputSchema;
