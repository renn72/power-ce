import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxCreateManyInputSchema } from '../inputTypeSchemas/OneRepMaxCreateManyInputSchema'

export const OneRepMaxCreateManyArgsSchema: z.ZodType<Prisma.OneRepMaxCreateManyArgs> = z.object({
  data: z.union([ OneRepMaxCreateManyInputSchema,OneRepMaxCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default OneRepMaxCreateManyArgsSchema;
