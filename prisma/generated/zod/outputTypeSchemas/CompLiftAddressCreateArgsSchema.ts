import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressCreateInputSchema } from '../inputTypeSchemas/CompLiftAddressCreateInputSchema'
import { CompLiftAddressUncheckedCreateInputSchema } from '../inputTypeSchemas/CompLiftAddressUncheckedCreateInputSchema'
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

export const CompLiftAddressCreateArgsSchema: z.ZodType<Prisma.CompLiftAddressCreateArgs> = z.object({
  select: CompLiftAddressSelectSchema.optional(),
  data: z.union([ CompLiftAddressCreateInputSchema,CompLiftAddressUncheckedCreateInputSchema ]),
}).strict() ;

export default CompLiftAddressCreateArgsSchema;
