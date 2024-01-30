import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { LogUpdateManyMutationInputSchema } from '../inputTypeSchemas/LogUpdateManyMutationInputSchema'
import { LogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/LogUncheckedUpdateManyInputSchema'
import { LogWhereInputSchema } from '../inputTypeSchemas/LogWhereInputSchema'

export const LogUpdateManyArgsSchema: z.ZodType<Prisma.LogUpdateManyArgs> = z.object({
  data: z.union([ LogUpdateManyMutationInputSchema,LogUncheckedUpdateManyInputSchema ]),
  where: LogWhereInputSchema.optional(),
}).strict() ;

export default LogUpdateManyArgsSchema;
