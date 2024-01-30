import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftUpdateManyMutationInputSchema } from '../inputTypeSchemas/LiftUpdateManyMutationInputSchema'
import { LiftUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/LiftUncheckedUpdateManyInputSchema'
import { LiftWhereInputSchema } from '../inputTypeSchemas/LiftWhereInputSchema'

export const LiftUpdateManyArgsSchema: z.ZodType<Prisma.LiftUpdateManyArgs> = z.object({
  data: z.union([ LiftUpdateManyMutationInputSchema,LiftUncheckedUpdateManyInputSchema ]),
  where: LiftWhereInputSchema.optional(),
}).strict() ;

export default LiftUpdateManyArgsSchema;
