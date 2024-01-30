import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetCreateManyInputSchema } from '../inputTypeSchemas/SuperSetCreateManyInputSchema'

export const SuperSetCreateManyArgsSchema: z.ZodType<Prisma.SuperSetCreateManyArgs> = z.object({
  data: z.union([ SuperSetCreateManyInputSchema,SuperSetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SuperSetCreateManyArgsSchema;
