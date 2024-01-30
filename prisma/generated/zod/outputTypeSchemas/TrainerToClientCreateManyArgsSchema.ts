import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientCreateManyInputSchema } from '../inputTypeSchemas/TrainerToClientCreateManyInputSchema'

export const TrainerToClientCreateManyArgsSchema: z.ZodType<Prisma.TrainerToClientCreateManyArgs> = z.object({
  data: z.union([ TrainerToClientCreateManyInputSchema,TrainerToClientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default TrainerToClientCreateManyArgsSchema;
