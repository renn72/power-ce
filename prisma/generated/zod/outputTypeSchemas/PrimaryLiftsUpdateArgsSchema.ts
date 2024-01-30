import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsUpdateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUpdateInputSchema'
import { PrimaryLiftsUncheckedUpdateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUncheckedUpdateInputSchema'
import { PrimaryLiftsWhereUniqueInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PrimaryLiftsSelectSchema: z.ZodType<Prisma.PrimaryLiftsSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  creadedBy: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
}).strict()

export const PrimaryLiftsUpdateArgsSchema: z.ZodType<Prisma.PrimaryLiftsUpdateArgs> = z.object({
  select: PrimaryLiftsSelectSchema.optional(),
  data: z.union([ PrimaryLiftsUpdateInputSchema,PrimaryLiftsUncheckedUpdateInputSchema ]),
  where: PrimaryLiftsWhereUniqueInputSchema,
}).strict() ;

export default PrimaryLiftsUpdateArgsSchema;
