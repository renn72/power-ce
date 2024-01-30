import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsCreateManyInputSchema } from '../inputTypeSchemas/PrimaryLiftsCreateManyInputSchema'

export const PrimaryLiftsCreateManyArgsSchema: z.ZodType<Prisma.PrimaryLiftsCreateManyArgs> = z.object({
  data: z.union([ PrimaryLiftsCreateManyInputSchema,PrimaryLiftsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default PrimaryLiftsCreateManyArgsSchema;
