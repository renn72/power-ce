import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxWhereInputSchema } from '../inputTypeSchemas/OneRepMaxWhereInputSchema'
import { OneRepMaxOrderByWithRelationInputSchema } from '../inputTypeSchemas/OneRepMaxOrderByWithRelationInputSchema'
import { OneRepMaxWhereUniqueInputSchema } from '../inputTypeSchemas/OneRepMaxWhereUniqueInputSchema'
import { OneRepMaxScalarFieldEnumSchema } from '../inputTypeSchemas/OneRepMaxScalarFieldEnumSchema'
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

export const OneRepMaxFindManyArgsSchema: z.ZodType<Prisma.OneRepMaxFindManyArgs> = z.object({
  select: OneRepMaxSelectSchema.optional(),
  where: OneRepMaxWhereInputSchema.optional(),
  orderBy: z.union([ OneRepMaxOrderByWithRelationInputSchema.array(),OneRepMaxOrderByWithRelationInputSchema ]).optional(),
  cursor: OneRepMaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OneRepMaxScalarFieldEnumSchema,OneRepMaxScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default OneRepMaxFindManyArgsSchema;
