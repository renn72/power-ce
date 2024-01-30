import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayCreateManyInputSchema } from '../inputTypeSchemas/DayCreateManyInputSchema'

export const DayCreateManyArgsSchema: z.ZodType<Prisma.DayCreateManyArgs> = z.object({
  data: z.union([ DayCreateManyInputSchema,DayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default DayCreateManyArgsSchema;
