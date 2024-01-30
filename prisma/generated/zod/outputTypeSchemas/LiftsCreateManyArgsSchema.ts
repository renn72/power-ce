import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsCreateManyInputSchema } from '../inputTypeSchemas/LiftsCreateManyInputSchema'

export const LiftsCreateManyArgsSchema: z.ZodType<Prisma.LiftsCreateManyArgs> = z.object({
  data: z.union([ LiftsCreateManyInputSchema,LiftsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default LiftsCreateManyArgsSchema;
