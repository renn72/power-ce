import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexUpdateManyMutationInputSchema } from '../inputTypeSchemas/RPEIndexUpdateManyMutationInputSchema'
import { RPEIndexUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RPEIndexUncheckedUpdateManyInputSchema'
import { RPEIndexWhereInputSchema } from '../inputTypeSchemas/RPEIndexWhereInputSchema'

export const RPEIndexUpdateManyArgsSchema: z.ZodType<Prisma.RPEIndexUpdateManyArgs> = z.object({
  data: z.union([ RPEIndexUpdateManyMutationInputSchema,RPEIndexUncheckedUpdateManyInputSchema ]),
  where: RPEIndexWhereInputSchema.optional(),
}).strict() ;

export default RPEIndexUpdateManyArgsSchema;
