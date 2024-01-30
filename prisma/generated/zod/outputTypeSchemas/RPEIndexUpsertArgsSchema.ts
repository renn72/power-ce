import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereUniqueInputSchema } from '../inputTypeSchemas/RPEIndexWhereUniqueInputSchema'
import { RPEIndexCreateInputSchema } from '../inputTypeSchemas/RPEIndexCreateInputSchema'
import { RPEIndexUncheckedCreateInputSchema } from '../inputTypeSchemas/RPEIndexUncheckedCreateInputSchema'
import { RPEIndexUpdateInputSchema } from '../inputTypeSchemas/RPEIndexUpdateInputSchema'
import { RPEIndexUncheckedUpdateInputSchema } from '../inputTypeSchemas/RPEIndexUncheckedUpdateInputSchema'
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

export const RPEIndexUpsertArgsSchema: z.ZodType<Prisma.RPEIndexUpsertArgs> = z.object({
  select: RPEIndexSelectSchema.optional(),
  where: RPEIndexWhereUniqueInputSchema,
  create: z.union([ RPEIndexCreateInputSchema,RPEIndexUncheckedCreateInputSchema ]),
  update: z.union([ RPEIndexUpdateInputSchema,RPEIndexUncheckedUpdateInputSchema ]),
}).strict() ;

export default RPEIndexUpsertArgsSchema;
