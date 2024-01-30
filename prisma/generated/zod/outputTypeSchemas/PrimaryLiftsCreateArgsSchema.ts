import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsCreateInputSchema } from '../inputTypeSchemas/PrimaryLiftsCreateInputSchema'
import { PrimaryLiftsUncheckedCreateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUncheckedCreateInputSchema'
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

export const PrimaryLiftsCreateArgsSchema: z.ZodType<Prisma.PrimaryLiftsCreateArgs> = z.object({
  select: PrimaryLiftsSelectSchema.optional(),
  data: z.union([ PrimaryLiftsCreateInputSchema,PrimaryLiftsUncheckedCreateInputSchema ]),
}).strict() ;

export default PrimaryLiftsCreateArgsSchema;
