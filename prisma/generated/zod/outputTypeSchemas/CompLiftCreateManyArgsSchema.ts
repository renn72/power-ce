import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftCreateManyInputSchema } from '../inputTypeSchemas/CompLiftCreateManyInputSchema'

export const CompLiftCreateManyArgsSchema: z.ZodType<Prisma.CompLiftCreateManyArgs> = z.object({
  data: z.union([ CompLiftCreateManyInputSchema,CompLiftCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CompLiftCreateManyArgsSchema;
