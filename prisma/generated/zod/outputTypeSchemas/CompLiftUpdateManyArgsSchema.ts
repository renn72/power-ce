import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftUpdateManyMutationInputSchema } from '../inputTypeSchemas/CompLiftUpdateManyMutationInputSchema'
import { CompLiftUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CompLiftUncheckedUpdateManyInputSchema'
import { CompLiftWhereInputSchema } from '../inputTypeSchemas/CompLiftWhereInputSchema'

export const CompLiftUpdateManyArgsSchema: z.ZodType<Prisma.CompLiftUpdateManyArgs> = z.object({
  data: z.union([ CompLiftUpdateManyMutationInputSchema,CompLiftUncheckedUpdateManyInputSchema ]),
  where: CompLiftWhereInputSchema.optional(),
}).strict() ;

export default CompLiftUpdateManyArgsSchema;
