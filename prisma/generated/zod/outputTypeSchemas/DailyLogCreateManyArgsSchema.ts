import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogCreateManyInputSchema } from '../inputTypeSchemas/DailyLogCreateManyInputSchema'

export const DailyLogCreateManyArgsSchema: z.ZodType<Prisma.DailyLogCreateManyArgs> = z.object({
  data: z.union([ DailyLogCreateManyInputSchema,DailyLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default DailyLogCreateManyArgsSchema;
