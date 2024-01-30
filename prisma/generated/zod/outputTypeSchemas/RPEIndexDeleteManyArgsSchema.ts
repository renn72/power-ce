import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RPEIndexWhereInputSchema } from '../inputTypeSchemas/RPEIndexWhereInputSchema'

export const RPEIndexDeleteManyArgsSchema: z.ZodType<Prisma.RPEIndexDeleteManyArgs> = z.object({
  where: RPEIndexWhereInputSchema.optional(),
}).strict() ;

export default RPEIndexDeleteManyArgsSchema;
