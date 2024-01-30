import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientUpdateManyMutationInputSchema } from '../inputTypeSchemas/TrainerToClientUpdateManyMutationInputSchema'
import { TrainerToClientUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TrainerToClientUncheckedUpdateManyInputSchema'
import { TrainerToClientWhereInputSchema } from '../inputTypeSchemas/TrainerToClientWhereInputSchema'

export const TrainerToClientUpdateManyArgsSchema: z.ZodType<Prisma.TrainerToClientUpdateManyArgs> = z.object({
  data: z.union([ TrainerToClientUpdateManyMutationInputSchema,TrainerToClientUncheckedUpdateManyInputSchema ]),
  where: TrainerToClientWhereInputSchema.optional(),
}).strict() ;

export default TrainerToClientUpdateManyArgsSchema;
