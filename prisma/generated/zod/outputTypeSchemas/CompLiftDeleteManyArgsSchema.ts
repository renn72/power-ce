import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftWhereInputSchema } from '../inputTypeSchemas/CompLiftWhereInputSchema'

export const CompLiftDeleteManyArgsSchema: z.ZodType<Prisma.CompLiftDeleteManyArgs> = z.object({
  where: CompLiftWhereInputSchema.optional(),
}).strict() ;

export default CompLiftDeleteManyArgsSchema;
