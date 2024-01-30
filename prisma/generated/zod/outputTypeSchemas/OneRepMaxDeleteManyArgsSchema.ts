import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OneRepMaxWhereInputSchema } from '../inputTypeSchemas/OneRepMaxWhereInputSchema'

export const OneRepMaxDeleteManyArgsSchema: z.ZodType<Prisma.OneRepMaxDeleteManyArgs> = z.object({
  where: OneRepMaxWhereInputSchema.optional(),
}).strict() ;

export default OneRepMaxDeleteManyArgsSchema;
