import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayWhereInputSchema } from '../inputTypeSchemas/DayWhereInputSchema'

export const DayDeleteManyArgsSchema: z.ZodType<Prisma.DayDeleteManyArgs> = z.object({
  where: DayWhereInputSchema.optional(),
}).strict() ;

export default DayDeleteManyArgsSchema;
