import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexCreateManyInputSchema } from '../inputTypeSchemas/RPEIndexCreateManyInputSchema'

export const RPEIndexCreateManyArgsSchema: z.ZodType<Prisma.RPEIndexCreateManyArgs> = z.object({
  data: z.union([ RPEIndexCreateManyInputSchema,RPEIndexCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RPEIndexCreateManyArgsSchema;
