import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetCreateManyInputSchema } from '../inputTypeSchemas/SetCreateManyInputSchema'

export const SetCreateManyArgsSchema: z.ZodType<Prisma.SetCreateManyArgs> = z.object({
  data: z.union([ SetCreateManyInputSchema,SetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SetCreateManyArgsSchema;
