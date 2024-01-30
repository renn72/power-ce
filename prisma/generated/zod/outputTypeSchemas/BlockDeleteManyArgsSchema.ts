import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockWhereInputSchema } from '../inputTypeSchemas/BlockWhereInputSchema'

export const BlockDeleteManyArgsSchema: z.ZodType<Prisma.BlockDeleteManyArgs> = z.object({
  where: BlockWhereInputSchema.optional(),
}).strict() ;

export default BlockDeleteManyArgsSchema;
