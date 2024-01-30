import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecordUpdateInputSchema } from '../inputTypeSchemas/RecordUpdateInputSchema'
import { RecordUncheckedUpdateInputSchema } from '../inputTypeSchemas/RecordUncheckedUpdateInputSchema'
import { RecordWhereUniqueInputSchema } from '../inputTypeSchemas/RecordWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  date: z.boolean().optional(),
  lift: z.boolean().optional(),
  wc: z.boolean().optional(),
  gender: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  userId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}).strict()

export const RecordUpdateArgsSchema: z.ZodType<Prisma.RecordUpdateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  data: z.union([ RecordUpdateInputSchema,RecordUncheckedUpdateInputSchema ]),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export default RecordUpdateArgsSchema;
