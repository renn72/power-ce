import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereInputSchema } from '../inputTypeSchemas/CompDateWhereInputSchema'
import { CompDateOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompDateOrderByWithRelationInputSchema'
import { CompDateWhereUniqueInputSchema } from '../inputTypeSchemas/CompDateWhereUniqueInputSchema'
import { CompDateScalarFieldEnumSchema } from '../inputTypeSchemas/CompDateScalarFieldEnumSchema'
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

export const CompDateFindFirstArgsSchema: z.ZodType<Prisma.CompDateFindFirstArgs> = z.object({
  select: CompDateSelectSchema.optional(),
  where: CompDateWhereInputSchema.optional(),
  orderBy: z.union([ CompDateOrderByWithRelationInputSchema.array(),CompDateOrderByWithRelationInputSchema ]).optional(),
  cursor: CompDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompDateScalarFieldEnumSchema,CompDateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default CompDateFindFirstArgsSchema;
