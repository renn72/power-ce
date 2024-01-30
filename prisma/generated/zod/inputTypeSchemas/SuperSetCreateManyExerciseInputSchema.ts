import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';

export const SuperSetCreateManyExerciseInputSchema: z.ZodType<Prisma.SuperSetCreateManyExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  lift: z.string().optional().nullable(),
  sets: z.number().int().optional().nullable(),
  reps: z.number().int().optional().nullable(),
  userId: z.string().optional().nullable(),
  trainerId: z.string().optional().nullable(),
  isTemplate: z.boolean().optional().nullable(),
  repUnit: z.string().optional().nullable(),
  weightType: z.string().optional().nullable(),
  onerm: z.number().int().optional().nullable(),
  onermTop: z.number().int().optional().nullable(),
  weightTop: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  weightBottom: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  targetRpe: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  targetRpeHigh: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  restTime: z.number().int().optional().nullable(),
  restUnit: z.string().optional().nullable(),
  setWieght: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  setTopWeight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  isEstimatedOnerm: z.boolean().optional().nullable(),
  estimatedOnermIndex: z.number().int().optional().nullable(),
  actualSets: z.number().int().optional().nullable(),
  actualReps: z.number().int().optional().nullable(),
  isComplete: z.boolean().optional(),
  rpe: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  weight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  notes: z.string().optional().nullable(),
  htmlLink: z.string().optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable()
}).strict();

export default SuperSetCreateManyExerciseInputSchema;
