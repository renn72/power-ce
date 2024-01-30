import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereUniqueInputSchema } from '../inputTypeSchemas/CompDateWhereUniqueInputSchema'
import { CompDateCreateInputSchema } from '../inputTypeSchemas/CompDateCreateInputSchema'
import { CompDateUncheckedCreateInputSchema } from '../inputTypeSchemas/CompDateUncheckedCreateInputSchema'
import { CompDateUpdateInputSchema } from '../inputTypeSchemas/CompDateUpdateInputSchema'
import { CompDateUncheckedUpdateInputSchema } from '../inputTypeSchemas/CompDateUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompDateSelectSchema: z.ZodType<Prisma.CompDateSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  date: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
}).strict()

export const CompDateUpsertArgsSchema: z.ZodType<Prisma.CompDateUpsertArgs> = z.object({
  select: CompDateSelectSchema.optional(),
  where: CompDateWhereUniqueInputSchema,
  create: z.union([ CompDateCreateInputSchema,CompDateUncheckedCreateInputSchema ]),
  update: z.union([ CompDateUpdateInputSchema,CompDateUncheckedUpdateInputSchema ]),
}).strict() ;

export default CompDateUpsertArgsSchema;
