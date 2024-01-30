import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogWhereInputSchema } from '../inputTypeSchemas/DailyLogWhereInputSchema'

export const DailyLogDeleteManyArgsSchema: z.ZodType<Prisma.DailyLogDeleteManyArgs> = z.object({
  where: DailyLogWhereInputSchema.optional(),
}).strict() ;

export default DailyLogDeleteManyArgsSchema;
