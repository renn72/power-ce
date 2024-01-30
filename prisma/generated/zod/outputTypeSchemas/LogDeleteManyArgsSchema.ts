import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogWhereInputSchema } from '../inputTypeSchemas/LogWhereInputSchema'

export const LogDeleteManyArgsSchema: z.ZodType<Prisma.LogDeleteManyArgs> = z.object({
  where: LogWhereInputSchema.optional(),
}).strict() ;

export default LogDeleteManyArgsSchema;
