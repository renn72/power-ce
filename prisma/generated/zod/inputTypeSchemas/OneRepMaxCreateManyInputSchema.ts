import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';

export const OneRepMaxCreateManyInputSchema: z.ZodType<Prisma.OneRepMaxCreateManyInput> = z.object({
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  lift: z.string(),
  weight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable()
}).strict();

export default OneRepMaxCreateManyInputSchema;
