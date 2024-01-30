import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';

export const RecordUncheckedCreateInputSchema: z.ZodType<Prisma.RecordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  date: z.coerce.date().optional(),
  lift: z.string(),
  wc: z.string(),
  gender: z.string(),
  name: z.string(),
  weight: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  userId: z.string(),
  isDeleted: z.boolean().optional()
}).strict();

export default RecordUncheckedCreateInputSchema;
