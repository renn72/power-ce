import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateUpdateManyMutationInputSchema } from '../inputTypeSchemas/CompDateUpdateManyMutationInputSchema'
import { CompDateUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CompDateUncheckedUpdateManyInputSchema'
import { CompDateWhereInputSchema } from '../inputTypeSchemas/CompDateWhereInputSchema'

export const CompDateUpdateManyArgsSchema: z.ZodType<Prisma.CompDateUpdateManyArgs> = z.object({
  data: z.union([ CompDateUpdateManyMutationInputSchema,CompDateUncheckedUpdateManyInputSchema ]),
  where: CompDateWhereInputSchema.optional(),
}).strict() ;

export default CompDateUpdateManyArgsSchema;
