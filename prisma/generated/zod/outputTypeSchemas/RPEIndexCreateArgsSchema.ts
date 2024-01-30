import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexCreateInputSchema } from '../inputTypeSchemas/RPEIndexCreateInputSchema'
import { RPEIndexUncheckedCreateInputSchema } from '../inputTypeSchemas/RPEIndexUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RPEIndexSelectSchema: z.ZodType<Prisma.RPEIndexSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  value: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}).strict()

export const RPEIndexCreateArgsSchema: z.ZodType<Prisma.RPEIndexCreateArgs> = z.object({
  select: RPEIndexSelectSchema.optional(),
  data: z.union([ RPEIndexCreateInputSchema,RPEIndexUncheckedCreateInputSchema ]),
}).strict() ;

export default RPEIndexCreateArgsSchema;
