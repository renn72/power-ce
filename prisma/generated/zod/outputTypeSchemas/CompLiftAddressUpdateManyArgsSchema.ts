import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressUpdateManyMutationInputSchema } from '../inputTypeSchemas/CompLiftAddressUpdateManyMutationInputSchema'
import { CompLiftAddressUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CompLiftAddressUncheckedUpdateManyInputSchema'
import { CompLiftAddressWhereInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereInputSchema'

export const CompLiftAddressUpdateManyArgsSchema: z.ZodType<Prisma.CompLiftAddressUpdateManyArgs> = z.object({
  data: z.union([ CompLiftAddressUpdateManyMutationInputSchema,CompLiftAddressUncheckedUpdateManyInputSchema ]),
  where: CompLiftAddressWhereInputSchema.optional(),
}).strict() ;

export default CompLiftAddressUpdateManyArgsSchema;
