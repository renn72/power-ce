import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupUpdateManyMutationInputSchema } from '../inputTypeSchemas/WarmupUpdateManyMutationInputSchema'
import { WarmupUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WarmupUncheckedUpdateManyInputSchema'
import { WarmupWhereInputSchema } from '../inputTypeSchemas/WarmupWhereInputSchema'

export const WarmupUpdateManyArgsSchema: z.ZodType<Prisma.WarmupUpdateManyArgs> = z.object({
  data: z.union([ WarmupUpdateManyMutationInputSchema,WarmupUncheckedUpdateManyInputSchema ]),
  where: WarmupWhereInputSchema.optional(),
}).strict() ;

export default WarmupUpdateManyArgsSchema;
