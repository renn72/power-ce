import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientWhereInputSchema } from '../inputTypeSchemas/TrainerToClientWhereInputSchema'

export const TrainerToClientDeleteManyArgsSchema: z.ZodType<Prisma.TrainerToClientDeleteManyArgs> = z.object({
  where: TrainerToClientWhereInputSchema.optional(),
}).strict() ;

export default TrainerToClientDeleteManyArgsSchema;
