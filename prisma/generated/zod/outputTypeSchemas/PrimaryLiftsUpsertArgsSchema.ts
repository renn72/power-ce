import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsWhereUniqueInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereUniqueInputSchema'
import { PrimaryLiftsCreateInputSchema } from '../inputTypeSchemas/PrimaryLiftsCreateInputSchema'
import { PrimaryLiftsUncheckedCreateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUncheckedCreateInputSchema'
import { PrimaryLiftsUpdateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUpdateInputSchema'
import { PrimaryLiftsUncheckedUpdateInputSchema } from '../inputTypeSchemas/PrimaryLiftsUncheckedUpdateInputSchema'
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

export const PrimaryLiftsUpsertArgsSchema: z.ZodType<Prisma.PrimaryLiftsUpsertArgs> = z.object({
  select: PrimaryLiftsSelectSchema.optional(),
  where: PrimaryLiftsWhereUniqueInputSchema,
  create: z.union([ PrimaryLiftsCreateInputSchema,PrimaryLiftsUncheckedCreateInputSchema ]),
  update: z.union([ PrimaryLiftsUpdateInputSchema,PrimaryLiftsUncheckedUpdateInputSchema ]),
}).strict() ;

export default PrimaryLiftsUpsertArgsSchema;
