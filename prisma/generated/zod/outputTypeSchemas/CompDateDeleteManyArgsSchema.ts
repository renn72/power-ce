import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompDateWhereInputSchema } from '../inputTypeSchemas/CompDateWhereInputSchema'

export const CompDateDeleteManyArgsSchema: z.ZodType<Prisma.CompDateDeleteManyArgs> = z.object({
  where: CompDateWhereInputSchema.optional(),
}).strict() ;

export default CompDateDeleteManyArgsSchema;
