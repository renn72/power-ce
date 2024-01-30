import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexUpdateInputSchema } from '../inputTypeSchemas/RPEIndexUpdateInputSchema'
import { RPEIndexUncheckedUpdateInputSchema } from '../inputTypeSchemas/RPEIndexUncheckedUpdateInputSchema'
import { RPEIndexWhereUniqueInputSchema } from '../inputTypeSchemas/RPEIndexWhereUniqueInputSchema'
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

export const RPEIndexUpdateArgsSchema: z.ZodType<Prisma.RPEIndexUpdateArgs> = z.object({
  select: RPEIndexSelectSchema.optional(),
  data: z.union([ RPEIndexUpdateInputSchema,RPEIndexUncheckedUpdateInputSchema ]),
  where: RPEIndexWhereUniqueInputSchema,
}).strict() ;

export default RPEIndexUpdateArgsSchema;
