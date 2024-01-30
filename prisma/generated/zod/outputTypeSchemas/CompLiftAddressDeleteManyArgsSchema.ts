import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftAddressWhereInputSchema } from '../inputTypeSchemas/CompLiftAddressWhereInputSchema'

export const CompLiftAddressDeleteManyArgsSchema: z.ZodType<Prisma.CompLiftAddressDeleteManyArgs> = z.object({
  where: CompLiftAddressWhereInputSchema.optional(),
}).strict() ;

export default CompLiftAddressDeleteManyArgsSchema;
