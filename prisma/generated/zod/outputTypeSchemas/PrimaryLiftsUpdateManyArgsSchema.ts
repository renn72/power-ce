import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsUpdateManyMutationInputSchema } from '../inputTypeSchemas/PrimaryLiftsUpdateManyMutationInputSchema'
import { PrimaryLiftsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PrimaryLiftsUncheckedUpdateManyInputSchema'
import { PrimaryLiftsWhereInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereInputSchema'

export const PrimaryLiftsUpdateManyArgsSchema: z.ZodType<Prisma.PrimaryLiftsUpdateManyArgs> = z.object({
  data: z.union([ PrimaryLiftsUpdateManyMutationInputSchema,PrimaryLiftsUncheckedUpdateManyInputSchema ]),
  where: PrimaryLiftsWhereInputSchema.optional(),
}).strict() ;

export default PrimaryLiftsUpdateManyArgsSchema;
