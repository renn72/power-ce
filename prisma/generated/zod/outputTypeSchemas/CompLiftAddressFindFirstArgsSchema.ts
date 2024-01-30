import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressWhereInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereInputSchema'
import { CompLiftAddressOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompLiftAddressOrderByWithRelationInputSchema'
import { CompLiftAddressWhereUniqueInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereUniqueInputSchema'
import { CompLiftAddressScalarFieldEnumSchema } from '../inputTypeSchemas/CompLiftAddressScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompLiftAddressSelectSchema: z.ZodType<Prisma.CompLiftAddressSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  address: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
}).strict()

export const CompLiftAddressFindFirstArgsSchema: z.ZodType<Prisma.CompLiftAddressFindFirstArgs> = z.object({
  select: CompLiftAddressSelectSchema.optional(),
  where: CompLiftAddressWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftAddressOrderByWithRelationInputSchema.array(),CompLiftAddressOrderByWithRelationInputSchema ]).optional(),
  cursor: CompLiftAddressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompLiftAddressScalarFieldEnumSchema,CompLiftAddressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default CompLiftAddressFindFirstArgsSchema;
