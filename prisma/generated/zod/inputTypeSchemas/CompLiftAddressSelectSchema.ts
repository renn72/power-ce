import { z } from 'zod';
import type { Prisma } from '@prisma/client';

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

export default CompLiftAddressSelectSchema;
