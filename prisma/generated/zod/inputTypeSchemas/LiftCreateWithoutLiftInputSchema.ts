import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';

export const LiftCreateWithoutLiftInputSchema: z.ZodType<Prisma.LiftCreateWithoutLiftInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  createdAtUser: z.coerce.date().optional(),
  userId: z.string(),
  trainerId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  weight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  reps: z.number().int(),
  liftName: z.string(),
  notes: z.string().optional().nullable(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default LiftCreateWithoutLiftInputSchema;
