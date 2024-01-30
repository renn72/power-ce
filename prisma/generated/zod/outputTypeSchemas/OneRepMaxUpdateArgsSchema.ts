import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxUpdateInputSchema } from '../inputTypeSchemas/OneRepMaxUpdateInputSchema'
import { OneRepMaxUncheckedUpdateInputSchema } from '../inputTypeSchemas/OneRepMaxUncheckedUpdateInputSchema'
import { OneRepMaxWhereUniqueInputSchema } from '../inputTypeSchemas/OneRepMaxWhereUniqueInputSchema'
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

export const OneRepMaxUpdateArgsSchema: z.ZodType<Prisma.OneRepMaxUpdateArgs> = z.object({
  select: OneRepMaxSelectSchema.optional(),
  data: z.union([ OneRepMaxUpdateInputSchema,OneRepMaxUncheckedUpdateInputSchema ]),
  where: OneRepMaxWhereUniqueInputSchema,
}).strict() ;

export default OneRepMaxUpdateArgsSchema;
