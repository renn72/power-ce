import { z } from 'zod';
import type { Prisma } from '@prisma/client';
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

export const PrimaryLiftsFindUniqueArgsSchema: z.ZodType<Prisma.PrimaryLiftsFindUniqueArgs> = z.object({
  select: PrimaryLiftsSelectSchema.optional(),
  where: PrimaryLiftsWhereUniqueInputSchema,
}).strict() ;

export default PrimaryLiftsFindUniqueArgsSchema;
