import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsUpdateManyMutationInputSchema } from '../inputTypeSchemas/LiftsUpdateManyMutationInputSchema'
import { LiftsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/LiftsUncheckedUpdateManyInputSchema'
import { LiftsWhereInputSchema } from '../inputTypeSchemas/LiftsWhereInputSchema'

export const LiftsUpdateManyArgsSchema: z.ZodType<Prisma.LiftsUpdateManyArgs> = z.object({
  data: z.union([ LiftsUpdateManyMutationInputSchema,LiftsUncheckedUpdateManyInputSchema ]),
  where: LiftsWhereInputSchema.optional(),
}).strict() ;

export default LiftsUpdateManyArgsSchema;
