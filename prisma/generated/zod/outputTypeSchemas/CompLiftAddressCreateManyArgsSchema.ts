import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressCreateManyInputSchema } from '../inputTypeSchemas/CompLiftAddressCreateManyInputSchema'

export const CompLiftAddressCreateManyArgsSchema: z.ZodType<Prisma.CompLiftAddressCreateManyArgs> = z.object({
  data: z.union([ CompLiftAddressCreateManyInputSchema,CompLiftAddressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CompLiftAddressCreateManyArgsSchema;
