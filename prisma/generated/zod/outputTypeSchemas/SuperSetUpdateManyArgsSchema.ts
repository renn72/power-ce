import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetUpdateManyMutationInputSchema } from '../inputTypeSchemas/SuperSetUpdateManyMutationInputSchema'
import { SuperSetUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SuperSetUncheckedUpdateManyInputSchema'
import { SuperSetWhereInputSchema } from '../inputTypeSchemas/SuperSetWhereInputSchema'

export const SuperSetUpdateManyArgsSchema: z.ZodType<Prisma.SuperSetUpdateManyArgs> = z.object({
  data: z.union([ SuperSetUpdateManyMutationInputSchema,SuperSetUncheckedUpdateManyInputSchema ]),
  where: SuperSetWhereInputSchema.optional(),
}).strict() ;

export default SuperSetUpdateManyArgsSchema;
