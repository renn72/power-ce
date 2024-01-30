import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SuperSetWhereInputSchema } from '../inputTypeSchemas/SuperSetWhereInputSchema'

export const SuperSetDeleteManyArgsSchema: z.ZodType<Prisma.SuperSetDeleteManyArgs> = z.object({
  where: SuperSetWhereInputSchema.optional(),
}).strict() ;

export default SuperSetDeleteManyArgsSchema;
