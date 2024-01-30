import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereInputSchema } from '../inputTypeSchemas/RPEIndexWhereInputSchema'
import { RPEIndexOrderByWithRelationInputSchema } from '../inputTypeSchemas/RPEIndexOrderByWithRelationInputSchema'
import { RPEIndexWhereUniqueInputSchema } from '../inputTypeSchemas/RPEIndexWhereUniqueInputSchema'
import { RPEIndexScalarFieldEnumSchema } from '../inputTypeSchemas/RPEIndexScalarFieldEnumSchema'
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

export const RPEIndexFindFirstArgsSchema: z.ZodType<Prisma.RPEIndexFindFirstArgs> = z.object({
  select: RPEIndexSelectSchema.optional(),
  where: RPEIndexWhereInputSchema.optional(),
  orderBy: z.union([ RPEIndexOrderByWithRelationInputSchema.array(),RPEIndexOrderByWithRelationInputSchema ]).optional(),
  cursor: RPEIndexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RPEIndexScalarFieldEnumSchema,RPEIndexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RPEIndexFindFirstArgsSchema;
