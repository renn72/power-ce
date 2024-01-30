import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogCreateManyInputSchema } from '../inputTypeSchemas/LogCreateManyInputSchema'

export const LogCreateManyArgsSchema: z.ZodType<Prisma.LogCreateManyArgs> = z.object({
  data: z.union([ LogCreateManyInputSchema,LogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default LogCreateManyArgsSchema;
