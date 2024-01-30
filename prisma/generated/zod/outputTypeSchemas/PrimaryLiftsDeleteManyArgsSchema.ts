import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PrimaryLiftsWhereInputSchema } from '../inputTypeSchemas/PrimaryLiftsWhereInputSchema'

export const PrimaryLiftsDeleteManyArgsSchema: z.ZodType<Prisma.PrimaryLiftsDeleteManyArgs> = z.object({
  where: PrimaryLiftsWhereInputSchema.optional(),
}).strict() ;

export default PrimaryLiftsDeleteManyArgsSchema;
