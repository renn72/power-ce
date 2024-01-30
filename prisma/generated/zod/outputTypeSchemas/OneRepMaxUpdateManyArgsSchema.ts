import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxUpdateManyMutationInputSchema } from '../inputTypeSchemas/OneRepMaxUpdateManyMutationInputSchema'
import { OneRepMaxUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/OneRepMaxUncheckedUpdateManyInputSchema'
import { OneRepMaxWhereInputSchema } from '../inputTypeSchemas/OneRepMaxWhereInputSchema'

export const OneRepMaxUpdateManyArgsSchema: z.ZodType<Prisma.OneRepMaxUpdateManyArgs> = z.object({
  data: z.union([ OneRepMaxUpdateManyMutationInputSchema,OneRepMaxUncheckedUpdateManyInputSchema ]),
  where: OneRepMaxWhereInputSchema.optional(),
}).strict() ;

export default OneRepMaxUpdateManyArgsSchema;
