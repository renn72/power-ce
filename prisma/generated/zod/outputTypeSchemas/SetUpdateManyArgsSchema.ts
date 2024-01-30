import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetUpdateManyMutationInputSchema } from '../inputTypeSchemas/SetUpdateManyMutationInputSchema'
import { SetUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SetUncheckedUpdateManyInputSchema'
import { SetWhereInputSchema } from '../inputTypeSchemas/SetWhereInputSchema'

export const SetUpdateManyArgsSchema: z.ZodType<Prisma.SetUpdateManyArgs> = z.object({
  data: z.union([ SetUpdateManyMutationInputSchema,SetUncheckedUpdateManyInputSchema ]),
  where: SetWhereInputSchema.optional(),
}).strict() ;

export default SetUpdateManyArgsSchema;
