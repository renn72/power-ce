import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockUpdateManyMutationInputSchema } from '../inputTypeSchemas/BlockUpdateManyMutationInputSchema'
import { BlockUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BlockUncheckedUpdateManyInputSchema'
import { BlockWhereInputSchema } from '../inputTypeSchemas/BlockWhereInputSchema'

export const BlockUpdateManyArgsSchema: z.ZodType<Prisma.BlockUpdateManyArgs> = z.object({
  data: z.union([ BlockUpdateManyMutationInputSchema,BlockUncheckedUpdateManyInputSchema ]),
  where: BlockWhereInputSchema.optional(),
}).strict() ;

export default BlockUpdateManyArgsSchema;
