import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LiftWhereInputSchema } from '../inputTypeSchemas/LiftWhereInputSchema'

export const LiftDeleteManyArgsSchema: z.ZodType<Prisma.LiftDeleteManyArgs> = z.object({
  where: LiftWhereInputSchema.optional(),
}).strict() ;

export default LiftDeleteManyArgsSchema;
