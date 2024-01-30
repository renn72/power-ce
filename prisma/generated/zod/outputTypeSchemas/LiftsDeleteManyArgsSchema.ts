import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftsWhereInputSchema } from '../inputTypeSchemas/LiftsWhereInputSchema'

export const LiftsDeleteManyArgsSchema: z.ZodType<Prisma.LiftsDeleteManyArgs> = z.object({
  where: LiftsWhereInputSchema.optional(),
}).strict() ;

export default LiftsDeleteManyArgsSchema;
