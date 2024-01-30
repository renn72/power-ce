import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxWhereUniqueInputSchema } from '../inputTypeSchemas/OneRepMaxWhereUniqueInputSchema'
import { OneRepMaxCreateInputSchema } from '../inputTypeSchemas/OneRepMaxCreateInputSchema'
import { OneRepMaxUncheckedCreateInputSchema } from '../inputTypeSchemas/OneRepMaxUncheckedCreateInputSchema'
import { OneRepMaxUpdateInputSchema } from '../inputTypeSchemas/OneRepMaxUpdateInputSchema'
import { OneRepMaxUncheckedUpdateInputSchema } from '../inputTypeSchemas/OneRepMaxUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OneRepMaxSelectSchema: z.ZodType<Prisma.OneRepMaxSelect> = z.object({
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  lift: z.boolean().optional(),
  weight: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
}).strict()

export const OneRepMaxUpsertArgsSchema: z.ZodType<Prisma.OneRepMaxUpsertArgs> = z.object({
  select: OneRepMaxSelectSchema.optional(),
  where: OneRepMaxWhereUniqueInputSchema,
  create: z.union([ OneRepMaxCreateInputSchema,OneRepMaxUncheckedCreateInputSchema ]),
  update: z.union([ OneRepMaxUpdateInputSchema,OneRepMaxUncheckedUpdateInputSchema ]),
}).strict() ;

export default OneRepMaxUpsertArgsSchema;
