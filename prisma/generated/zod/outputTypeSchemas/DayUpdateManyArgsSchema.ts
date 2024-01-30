import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DayUpdateManyMutationInputSchema } from '../inputTypeSchemas/DayUpdateManyMutationInputSchema'
import { DayUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/DayUncheckedUpdateManyInputSchema'
import { DayWhereInputSchema } from '../inputTypeSchemas/DayWhereInputSchema'

export const DayUpdateManyArgsSchema: z.ZodType<Prisma.DayUpdateManyArgs> = z.object({
  data: z.union([ DayUpdateManyMutationInputSchema,DayUncheckedUpdateManyInputSchema ]),
  where: DayWhereInputSchema.optional(),
}).strict() ;

export default DayUpdateManyArgsSchema;
