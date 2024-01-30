import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressWhereUniqueInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereUniqueInputSchema'
import { CompLiftAddressCreateInputSchema } from '../inputTypeSchemas/CompLiftAddressCreateInputSchema'
import { CompLiftAddressUncheckedCreateInputSchema } from '../inputTypeSchemas/CompLiftAddressUncheckedCreateInputSchema'
import { CompLiftAddressUpdateInputSchema } from '../inputTypeSchemas/CompLiftAddressUpdateInputSchema'
import { CompLiftAddressUncheckedUpdateInputSchema } from '../inputTypeSchemas/CompLiftAddressUncheckedUpdateInputSchema'
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

export const CompLiftAddressUpsertArgsSchema: z.ZodType<Prisma.CompLiftAddressUpsertArgs> = z.object({
  select: CompLiftAddressSelectSchema.optional(),
  where: CompLiftAddressWhereUniqueInputSchema,
  create: z.union([ CompLiftAddressCreateInputSchema,CompLiftAddressUncheckedCreateInputSchema ]),
  update: z.union([ CompLiftAddressUpdateInputSchema,CompLiftAddressUncheckedUpdateInputSchema ]),
}).strict() ;

export default CompLiftAddressUpsertArgsSchema;
