import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateUpdateManyMutationInputSchema } from '../inputTypeSchemas/WarmupTemplateUpdateManyMutationInputSchema'
import { WarmupTemplateUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WarmupTemplateUncheckedUpdateManyInputSchema'
import { WarmupTemplateWhereInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereInputSchema'

export const WarmupTemplateUpdateManyArgsSchema: z.ZodType<Prisma.WarmupTemplateUpdateManyArgs> = z.object({
  data: z.union([ WarmupTemplateUpdateManyMutationInputSchema,WarmupTemplateUncheckedUpdateManyInputSchema ]),
  where: WarmupTemplateWhereInputSchema.optional(),
}).strict() ;

export default WarmupTemplateUpdateManyArgsSchema;
