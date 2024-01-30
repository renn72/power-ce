import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';

export const SetCreateWithoutExerciseInputSchema: z.ZodType<Prisma.SetCreateWithoutExerciseInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  rep: z.number().int(),
  rpe: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  weight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  isComplete: z.boolean(),
  name: z.string().optional().nullable(),
  lift: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  trainerId: z.string().optional().nullable(),
  actualReps: z.number().int().optional().nullable(),
  estiamtedOnerm: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  flield4: z.string().optional().nullable(),
  flield5: z.string().optional().nullable()
}).strict();

export default SetCreateWithoutExerciseInputSchema;
