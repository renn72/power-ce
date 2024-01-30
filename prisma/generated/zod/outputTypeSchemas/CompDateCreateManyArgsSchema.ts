import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateCreateManyInputSchema } from '../inputTypeSchemas/CompDateCreateManyInputSchema'

export const CompDateCreateManyArgsSchema: z.ZodType<Prisma.CompDateCreateManyArgs> = z.object({
  data: z.union([ CompDateCreateManyInputSchema,CompDateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CompDateCreateManyArgsSchema;
