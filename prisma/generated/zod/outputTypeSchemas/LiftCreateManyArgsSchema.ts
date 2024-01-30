import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftCreateManyInputSchema } from '../inputTypeSchemas/LiftCreateManyInputSchema'

export const LiftCreateManyArgsSchema: z.ZodType<Prisma.LiftCreateManyArgs> = z.object({
  data: z.union([ LiftCreateManyInputSchema,LiftCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default LiftCreateManyArgsSchema;
