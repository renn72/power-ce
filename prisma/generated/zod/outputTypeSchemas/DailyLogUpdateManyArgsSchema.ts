import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DailyLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/DailyLogUpdateManyMutationInputSchema'
import { DailyLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/DailyLogUncheckedUpdateManyInputSchema'
import { DailyLogWhereInputSchema } from '../inputTypeSchemas/DailyLogWhereInputSchema'

export const DailyLogUpdateManyArgsSchema: z.ZodType<Prisma.DailyLogUpdateManyArgs> = z.object({
  data: z.union([ DailyLogUpdateManyMutationInputSchema,DailyLogUncheckedUpdateManyInputSchema ]),
  where: DailyLogWhereInputSchema.optional(),
}).strict() ;

export default DailyLogUpdateManyArgsSchema;
