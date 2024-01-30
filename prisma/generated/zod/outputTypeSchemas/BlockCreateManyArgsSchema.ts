import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockCreateManyInputSchema } from '../inputTypeSchemas/BlockCreateManyInputSchema'

export const BlockCreateManyArgsSchema: z.ZodType<Prisma.BlockCreateManyArgs> = z.object({
  data: z.union([ BlockCreateManyInputSchema,BlockCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BlockCreateManyArgsSchema;
