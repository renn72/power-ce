import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsWhereInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereInputSchema'
import { PrimaryLiftsOrderByWithRelationInputSchema } from '../inputTypeSchemas/PrimaryLiftsOrderByWithRelationInputSchema'
import { PrimaryLiftsWhereUniqueInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereUniqueInputSchema'
import { PrimaryLiftsScalarFieldEnumSchema } from '../inputTypeSchemas/PrimaryLiftsScalarFieldEnumSchema'
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

export const PrimaryLiftsFindManyArgsSchema: z.ZodType<Prisma.PrimaryLiftsFindManyArgs> = z.object({
  select: PrimaryLiftsSelectSchema.optional(),
  where: PrimaryLiftsWhereInputSchema.optional(),
  orderBy: z.union([ PrimaryLiftsOrderByWithRelationInputSchema.array(),PrimaryLiftsOrderByWithRelationInputSchema ]).optional(),
  cursor: PrimaryLiftsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrimaryLiftsScalarFieldEnumSchema,PrimaryLiftsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default PrimaryLiftsFindManyArgsSchema;
